import React from "react";

const FormHolder = (props) => {
	return <form onSubmit={props.submitFunction}>{children}</form>;
};
export default FormHolder;
