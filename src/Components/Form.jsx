import React from "react";

const Form = props => {
    return (
        <div className="container">
            <div>{props.error ? error() : null}</div>
            <form onSubmit={props.loadweather}>
                <div className="row mt-5">
                    
                    <div className="col-md-3 offset-md-2">
                        <input
                            type="text"
                            className="form-control bg-transparent text-white border-white rounded-3 p-3"
                            name="city"
                            autoComplete="off"
                            placeholder="City"
                        />
                    </div>
                    
                    <div className="col-md-3">
                        <input
                            type="text"
                            className="form-control bg-transparent text-white border-white rounded-3 p-3"
                            name="country"
                            autoComplete="off"
                            placeholder="Country"
                        />
                    </div>
                    
                    <div className="col-md-3 mt-md-0 mt-2 text-md-left d-flex">
                        <button
                            className="btn btn-outline-light rounded-3 bg-white text-dark px-4 py-2"
                            type="submit"
                        >
                            Get Weather
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

function error() {
    return (
        <div className="alert alert-danger mx-5" role="alert">
            Please Enter City and Country
        </div>
    );
}

export default Form;
