const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			//Your data structures, A.K.A Entities
			url: "https://assets.breatheco.de/apis/fake/contact/",
			agenda: "LJAgenda",
			contacts: null,
			contact: {
				full_name: "",
				email: "",
				agenda_slug: "",
				address: "",
				phone: ""
			},
			error: null
		},
		actions: {
			//(Arrow) Functions that update the Store
			// Remember to use the scope: scope.state.store & scope.setState()
			handleChange: e => {
				const store = getStore();
				let { contact } = store;
				contact.agenda_slug = store.agenda;
				contact[e.target.name] = e.target.value;

				setStore({ contact });
			},
			setContact: contact => {
				setStore({ contact });
			},
			getContacts: () => {
				const store = getStore();
				fetch(`${store.url}agenda/${store.agenda}`)
					.then(resp => resp.json())
					.then(data => setStore({ contacts: data }))
					.catch(error => setStore({ error }));
			},
			addContact: () => {
				const store = getStore();
				fetch(`${store.url}`, {
					method: "POST",
					body: JSON.stringify(store.contact),
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(resp => resp.json())
					.then(data => getActions().getContacts())
					.catch(error => setStore({ error }));
			},
			editContact: () => {
				const store = getStore();
				fetch(`${store.url}${store.contact.id}`, {
					method: "PUT",
					body: JSON.stringify(store.contact),
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(resp => resp.json())
					.then(data => getActions().getContacts())
					.catch(error => setStore({ error }));
			},
			delContact: () => {
				const store = getStore();
				fetch(`${store.url}${store.contact.id}`, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(resp => resp.json())
					.then(data => getActions().getContacts())
					.catch(error => setStore({ error }));
			}
		}
	};
};

export default getState;