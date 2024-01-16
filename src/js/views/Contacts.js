import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { ContactCard } from "../component/ContactCard.js";
import { Modal } from "../component/Modal";
import { Context } from "../store/appContext.js";
import PropTypes from "prop-types";

export const Contacts = props => {
	const { store, actions } = useContext(Context);
	const [state, setState] = useState({
		showModal: false
	});

	return (
		<div className="container">
			<div>
				<p className="text-right my-3">
					<Link className="btn btn-success" to="/add">
						Add new contact
					</Link>
				</p>
				<div id="contacts" className="panel-collapse collapse show" aria-expanded="true">
					<ul className="list-group pull-down" id="contact-list">
						{!!store.contacts && store.contacts.length > 0 ? (
							store.contacts.map((contact, i) => {
								return (
									<ContactCard
										key={i}
										onEdit={() => {
											actions.setContact(contact);
											props.history.push("/edit");
										}}
										onDelete={() => {
											setState({ showModal: true });
											actions.setContact(contact);
										}}
										contact={contact}
									/>
								);
							})
						) : (
							<li className="list-group-item">Agenda Sin Contactos</li>
						)}
					</ul>
				</div>
			</div>
			<Modal show={state.showModal} onClose={() => setState({ showModal: false })} />
		</div>
	);
};

Contacts.propTypes = {
	history: PropTypes.object
};