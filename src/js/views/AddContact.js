import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";

export const AddContact = props => {
	const { store, actions } = useContext(Context);
	return (
		<div className="container">
			<div>
				<h1 className="text-center mt-5">Add a new contact</h1>
				<form
					onSubmit={e => {
						e.preventDefault();
						if (props.location.pathname === "/add") {
							actions.addContact();
						} else {
							actions.editContact();
						}
					}}>
					<div className="form-group">
						<label>Full Name</label>
						<input
							type="text"
							name="full_name"
							className="form-control"
							placeholder="Full Name"
							value={store.contact.full_name}
							onChange={actions.handleChange}
						/>
					</div>
					<div className="form-group">
						<label>Email</label>
						<input
							type="email"
							name="email"
							className="form-control"
							placeholder="Enter email"
							value={store.contact.email}
							onChange={actions.handleChange}
						/>
					</div>
					<div className="form-group">
						<label>Phone</label>
						<input
							type="phone"
							name="phone"
							className="form-control"
							placeholder="Enter phone"
							value={store.contact.phone}
							onChange={actions.handleChange}
						/>
					</div>
					<div className="form-group">
						<label>Address</label>
						<input
							type="text"
							name="address"
							className="form-control"
							placeholder="Enter address"
							value={store.contact.address}
							onChange={actions.handleChange}
						/>
					</div>
					<button className="btn btn-primary form-control">save</button>
					<Link className="mt-3 w-100 text-center" to="/">
						or get back to contacts
					</Link>
				</form>
			</div>
		</div>
	);
};

AddContact.propTypes = {
	history: PropTypes.object,
	location: PropTypes.object,
	match: PropTypes.object
};