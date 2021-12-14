import React from "react";
import { useState, useRef, useEffect } from "react";
import Dashboard from './Dashboard/Dashboard';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { useAPI } from '../context/ApiContext'
import ReactDOM from 'react-dom';


const UserDashboard = () => {

	const [title, setTitle] = useState("Viewing All Trash Sorters")
	const [topData, setTopData] = useState([])
	const [trashTypes, setTrashTypes] = useState([])
	const [allUserTrashCan, setAllUserTrashCan] = useState([])
	const [categorySummary, setCategorySummary] = useState([])
	const { fetchTopTrashCans, fetchTrashCapacity, fetchTrashTypes,
		fetchUserTrashCans, fetchUserTrashTypes, fetchWeeklySummary,
		fetchUserWeeklySummary, registerTrashCan } = useAPI()
	const [accessedData, setAccessedData] = useState('all')
	const masterList = useRef([])
	const [searchInput, setSearchInput] = useState('')
	const [open, setOpen] = useState(false)
	const [modalError, setModalError] = useState([])
	const [modalSuccess, setModalSuccess] = useState('')
	const [location, setLocation] = useState('')
	const [trashId, setTrashId] = useState('')
	const [loadingModal, setLoadingModal] = useState(false)

	function formatTipeChart(data, masterlist) {
		let newData = []
		data.forEach((item) => {
			let tempObj = {}
			let temp = []
			tempObj["created"] = item.Created_date
			if (item.Data_type !== null) {
				item.Data_type.forEach((data_type) => {
					tempObj[data_type.name] = data_type.value
					temp.push(data_type.name)
				})
			}
			masterlist.forEach((types) => {
				if (!(temp.includes(types))) {
					tempObj[types] = 0
				}
			})
			newData.push(tempObj)
		})
		return (newData)
	}

	useEffect(() => {
		async function fetchData() {
			const allUserTrashCanResult = await fetchUserTrashCans()
			setAllUserTrashCan(allUserTrashCanResult.data)
		}
		fetchData()
	}, [accessedData]);

	useEffect(() => {
		async function fetchSpecificData() {
			if (accessedData === 'all') {
				const result = await fetchTopTrashCans()
				setTopData(result.data)
				console.log(result)
				const trashTypeResult = await fetchTrashTypes()
				setTrashTypes(trashTypeResult.data)
				masterList.current = trashTypeResult.type_available === null ? ['plastic', 'aluminium'] : trashTypeResult.type_available
				const WeeklyCategory = await fetchWeeklySummary()
				const weeklyData = []
				weeklyData.push({ "name": "organic", "total": WeeklyCategory.data.Category.organic })
				weeklyData.push({ "name": "inorganic", "total": WeeklyCategory.data.Category.inorganic })
				setCategorySummary(weeklyData)
			}
			else {
				const result = await fetchTrashCapacity(accessedData)
				const arrayData = []
				console.log(result)
				arrayData.push({ "name": "organic", "current": result.data.Organic_capacity, "max": result.data.Organic_max_height - result.data.Organic_capacity })
				arrayData.push({ "name": "inorganic", "current": result.data.Inorganic_capacity, "max": result.data.Inorganic_max_height - result.data.Inorganic_capacity })
				setTopData(arrayData)
				const trashTypeResult = await fetchUserTrashTypes(accessedData)
				setTrashTypes(trashTypeResult.data)
				masterList.current = trashTypeResult.type_available === null ? ['plastic', 'aluminium'] : trashTypeResult.type_available
				const WeeklyCategory = await fetchUserWeeklySummary(accessedData)
				const weeklyData = []
				weeklyData.push({ "name": "organic", "total": WeeklyCategory.data.Category.organic })
				weeklyData.push({ "name": "inorganic", "total": WeeklyCategory.data.Category.inorganic })
				setCategorySummary(weeklyData)
			}
		}
		fetchSpecificData()
	}, [allUserTrashCan])

	useEffect(() => {
		if (categorySummary.length) {
			setCategoryGraph("categorygraph", categorySummary)
		}
	}, [categorySummary])

	useEffect(() => {
		if (trashTypes.length &&
			(masterList.current).length) {
			setTypeGraph("typegraph", formatTipeChart(trashTypes, masterList.current))
		}
	}, [trashTypes])

	useEffect(() => {
		if (topData.length) {
			if (accessedData === 'all') {
				setMostTable("topchart", topData)
			}
			else {
				setCapacityTrash("topchart", topData)
			}
		}
	}, [topData])

	function setCategoryGraph(elementSelector, data) {
		am4core.useTheme(am4themes_animated);
		let check_data = false

		// Themes end
		if (data[0].total === 0 && data[1].total === 0) {
			data = [{
				"name": "Dummy",
				"disabled": true,
				"total": 1000,
				"color": am4core.color("#dadada"),
				"opacity": 0.3,
				"strokeDasharray": "4,4",
				"tooltip": "Trash sorter has not received any trash in this week"
			}];
			check_data = true
		}

		// Create chart instance
		var chart = am4core.create(elementSelector, am4charts.PieChart);

		// Add and configure Series
		var pieSeries = chart.series.push(new am4charts.PieSeries());
		pieSeries.dataFields.value = "total";
		pieSeries.dataFields.category = "name";

		// Let's cut a hole in our Pie chart the size of 30% the radius
		chart.innerRadius = am4core.percent(30);

		// Put a thick white border around each Slice
		pieSeries.slices.template.stroke = am4core.color("#fff");
		pieSeries.slices.template.strokeWidth = 2;
		pieSeries.slices.template.strokeOpacity = 1;
		pieSeries.slices.template
			// change the cursor on hover to make it apparent the object can be interacted with
			.cursorOverStyle = [
				{
					"property": "cursor",
					"value": "pointer"
				}
			];

		pieSeries.alignLabels = false;
		pieSeries.labels.template.bent = true;
		pieSeries.labels.template.radius = 3;
		pieSeries.labels.template.padding(0, 0, 0, 0);

		pieSeries.ticks.template.disabled = true;

		/* Set up slice appearance */
		var slice = pieSeries.slices.template;
		slice.propertyFields.fill = "color";
		slice.propertyFields.fillOpacity = "opacity";
		slice.propertyFields.stroke = "color";
		slice.propertyFields.strokeDasharray = "strokeDasharray";
		slice.propertyFields.tooltipText = "tooltip";

		pieSeries.labels.template.propertyFields.disabled = "disabled";
		pieSeries.ticks.template.propertyFields.disabled = "disabled";

		// Create a base filter effect (as if it's not there) for the hover to return to
		var shadow = pieSeries.slices.template.filters.push(new am4core.DropShadowFilter);
		shadow.opacity = 0;

		// Create hover state
		var hoverState = pieSeries.slices.template.states.getKey("hover"); // normally we have to create the hover state, in this case it already exists

		// Slightly shift the shadow and make it more prominent on hover
		var hoverShadow = hoverState.filters.push(new am4core.DropShadowFilter);
		hoverShadow.opacity = 0.7;
		hoverShadow.blur = 5;

		// Add a legend
		if (!check_data)
			chart.legend = new am4charts.Legend();

		chart.data = data

		var indicator;
		function showIndicator() {
			if (indicator) {
				indicator.show();
			}
			else {
				indicator = chart.tooltipContainer.createChild(am4core.Container);
				indicator.background.fill = am4core.color("#fff");
				indicator.background.fillOpacity = 0.8;
				indicator.width = am4core.percent(100);
				indicator.height = am4core.percent(100);

				var indicatorLabel = indicator.createChild(am4core.Label);
				indicatorLabel.text = "No data...";
				indicatorLabel.align = "center";
				indicatorLabel.valign = "middle";
				indicatorLabel.fontSize = 20;
			}
		}

		function hideIndicator() {
			indicator.hide();
		}

		chart.events.on("beforevalidated", function (ev) {
			// check if there's data
			if (!check_data) {
				showIndicator();
			}
			else if (indicator) {
				hideIndicator();
			}
		});
	}

	function setTypeGraph(elementSelector, data) {

		// Themes begin
		am4core.useTheme(am4themes_animated);
		// Themes end

		// Create chart instance
		let chart = am4core.create(elementSelector, am4charts.XYChart);

		// Create axes
		let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
		let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
		valueAxis.min = 0;

		(masterList.current).forEach((items) => {
			createSeries(data, items);
		})

		// Create series
		function createSeries(data, name) {
			let series = chart.series.push(new am4charts.LineSeries());
			series.dataFields.valueY = name;
			series.dataFields.dateX = "created";
			series.name = name;

			let segment = series.segments.template;
			segment.interactionsEnabled = true;

			let hoverState = segment.states.create("hover");
			hoverState.properties.strokeWidth = 3;

			let dimmed = segment.states.create("dimmed");
			dimmed.properties.stroke = am4core.color("#dadada");

			segment.events.on("over", function (event) {
				processOver(event.target.parent.parent.parent);
			});

			segment.events.on("out", function (event) {
				processOut(event.target.parent.parent.parent);
			});

			series.data = data;
			return series;
		}

		chart.legend = new am4charts.Legend();
		chart.legend.position = "right";
		chart.legend.scrollable = true;

		// setTimeout(function() {
		//   chart.legend.markers.getIndex(0).opacity = 0.3;
		// }, 3000)
		chart.legend.markers.template.states.create("dimmed").properties.opacity = 0.3;
		chart.legend.labels.template.states.create("dimmed").properties.opacity = 0.3;

		chart.legend.itemContainers.template.events.on("over", function (event) {
			processOver(event.target.dataItem.dataContext);
		})

		chart.legend.itemContainers.template.events.on("out", function (event) {
			processOut(event.target.dataItem.dataContext);
		})

		function processOver(hoveredSeries) {
			hoveredSeries.toFront();

			hoveredSeries.segments.each(function (segment) {
				segment.setState("hover");
			})

			hoveredSeries.legendDataItem.marker.setState("default");
			hoveredSeries.legendDataItem.label.setState("default");

			chart.series.each(function (series) {
				if (series !== hoveredSeries) {
					series.segments.each(function (segment) {
						segment.setState("dimmed");
					})
					series.bulletsContainer.setState("dimmed");
					series.legendDataItem.marker.setState("dimmed");
					series.legendDataItem.label.setState("dimmed");
				}
			});
		}

		function processOut() {
			chart.series.each(function (series) {
				series.segments.each(function (segment) {
					segment.setState("default");
				})
				series.bulletsContainer.setState("default");
				series.legendDataItem.marker.setState("default");
				series.legendDataItem.label.setState("default");
			});
		}
	}

	function setCapacityTrash(elementSelector, data) {
		// Themes begin
		am4core.useTheme(am4themes_animated);
		// Themes end

		// Create chart instance
		let chart = am4core.create(elementSelector, am4charts.XYChart);
		// Add data
		chart.data = data

		// Create axes
		let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
		categoryAxis.dataFields.category = "name";
		categoryAxis.title.text = "Local country offices";
		categoryAxis.renderer.grid.template.location = 0;
		categoryAxis.renderer.minGridDistance = 20;
		categoryAxis.renderer.cellStartLocation = 0.3;
		categoryAxis.renderer.cellEndLocation = 0.7;

		let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
		valueAxis.min = 0;
		valueAxis.title.text = "Expenditure (M)";

		// Create series
		function createSeries(field, name, stacked) {
			let series = chart.series.push(new am4charts.ColumnSeries());
			series.dataFields.valueY = field;
			series.dataFields.categoryX = "name";
			series.name = name;
			series.columns.template.tooltipText = name + ": [bold]{valueY}[/]";
			series.stacked = stacked;
			series.columns.template.width = am4core.percent(100);
		}

		createSeries("current", "Occupied Spaces", false);
		createSeries("max", "Available Spaces", true);


		// Add legend
		chart.legend = new am4charts.Legend();

	}

	function topChart(elementSelector, data) {

		// Themes begin
		am4core.useTheme(am4themes_animated);
		// Themes end

		let chart = am4core.create(elementSelector, am4charts.XYChart);

		let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
		categoryAxis.renderer.grid.template.location = 0;
		categoryAxis.dataFields.category = "Trash_sorter_location";
		categoryAxis.renderer.minGridDistance = 1;
		categoryAxis.renderer.inversed = true;
		categoryAxis.renderer.grid.template.disabled = true;
		let valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
		valueAxis.min = 0;

		let series = chart.series.push(new am4charts.ColumnSeries());
		series.dataFields.categoryY = "Trash_sorter_location";
		series.dataFields.valueX = "Total";
		series.tooltipText = "{valueX.value}"
		series.columns.template.strokeOpacity = 0;
		series.columns.template.column.cornerRadiusBottomRight = 5;
		series.columns.template.column.cornerRadiusTopRight = 5;

		let labelBullet = series.bullets.push(new am4charts.LabelBullet())
		labelBullet.label.horizontalCenter = "left";
		labelBullet.label.dx = 10;
		labelBullet.label.text = "{values.valueX.workingValue.formatNumber('#.0as')}";
		labelBullet.locationX = 1;

		// as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
		series.columns.template.adapter.add("fill", function (fill, target) {
			return chart.colors.getIndex(target.dataItem.index);
		});

		categoryAxis.sortBySeries = series;
		chart.data = data
	}

	function setMostTable(elementSelector, data) {
		am4core.ready(function () {
			topChart(elementSelector, data)
		})
	}

	function onClickSearchBar(value, title) {
		am4core.disposeAllCharts();
		setTopData([])
		setAccessedData(value)
		setTitle("Viewing " + title)
	}

	async function checkAddTrash(e) {
		e.preventDefault()
		setLoadingModal(true)
		const tempError = []
		if (trashId.length === 0) {
			tempError.push("Trash Code could not be empty")
		}
		if (location.length === 0) {
			tempError.push("Location name could not be empty")
		}
		if (tempError.length > 0) {
			setModalError(tempError)
			setModalSuccess("")
			setLoadingModal(false)
			return;
		}
		const val = { "trash_code": trashId, "location": location }
		const data = await registerTrashCan(val)
		console.log(typeof (data))
		console.log(data)
		setLoadingModal(false)
		if (data.status === 'unauthorized') {
			if (data.msg === 'failed, trash object is already assigned to an user')
				setModalError(["The Trash code has already been asigned to an user"])
			else
				setModalError(["The trash code may be invalid"])
			setModalSuccess("")
			return;
		}
		if (data.status === 'success') {
			setModalSuccess("Trash code successfully assigned!")
			const allUserTrashCanResult = await fetchUserTrashCans()
			setAllUserTrashCan(allUserTrashCanResult.data)
			return;
		}
		else {
			setModalError(["Error has occured, please try again later"])
			setModalSuccess("")
			return;
		}
	}

	return (
		<Dashboard.Container>
			<Dashboard.ModalAddTrashCan loadingModal={loadingModal} open={open} onClose={() => setOpen(false)} modalSuccess={modalSuccess} modalError={modalError} onClick={checkAddTrash} onChangeId={(e) => setTrashId(e.target.value)} onChangeLocation={(e) => setLocation(e.target.value)} />
			<Dashboard.SearchBar onChange={(e) => setSearchInput(e.target.value)} onClick={onClickSearchBar} searchBarData={allUserTrashCan} searchInput={searchInput} onClickAdd={() => setOpen(true)} />
			<Dashboard.Config title={title}>
				<Dashboard.Grid size="2">
					<Dashboard.Card len={topData.length} charTitle="Summary of trash category taken by sorter" chart_id="categorygraph" />
					<Dashboard.Card len={topData.length} charTitle={accessedData === 'all' ? "Top Trash Cans Used" : "Current Trash Can Capacity in cm"} chart_id="topchart" />
				</Dashboard.Grid>
				<Dashboard.Grid size="1">
					<Dashboard.Card len={topData.length} charTitle="Distribution of trash types thrown" chart_id="typegraph" />
				</Dashboard.Grid>
			</Dashboard.Config>
		</Dashboard.Container>
	);
};


export default UserDashboard;
