import React, { useState } from 'react';
import { useGetContactsQuery, useCreateContactMutation } from './contactsApi';
import { ContactType } from './types';
import { useNavigate } from 'react-router-dom';

export const Contacts = () => {
    const navigate = useNavigate();
    const { data, error, isLoading } = useGetContactsQuery(null);
    const [createContact] = useCreateContactMutation();

    const [name, setName] = useState('');
    const [type, setType] = useState<'personal' | 'business'>('personal');

    const handleCreateContact = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await createContact({ name, type }).unwrap();
            setName('');
        } catch (err) {
            console.error('Failed to create contact: ', err);
        }
    };

    return (
        <div className="container">
            <h1 className="title">Contacts</h1>
            {isLoading && <div className="notification is-info">Loading...</div>}
            {error && <div className="notification is-danger">Error: {error.toString()}</div>}
            {data && data.length === 0 && <div className="notification is-warning">No contacts found</div>}

            {data && data.length > 0 && (
                <div className="box">
                    <ul>
                        {data.map((contact: ContactType) => (
                            <li key={contact.id} className="media">
                                <div className="media-content">
                                    <p className="title is-5" onClick={() => navigate('/clarion-app/contacts/contact/' + contact.id)}>
                                        {contact.name}
                                    </p>
                                    <p className="subtitle is-6">{contact.type.charAt(0).toUpperCase() + contact.type.slice(1)} Contact</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
                        <div className="box">
                <form onSubmit={handleCreateContact}>
                    <div className="field">
                        <label className="label">Name</label>
                        <div className="control">
                            <input 
                                className="input" 
                                type="text" 
                                placeholder="Enter contact name" 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Type</label>
                        <div className="control">
                            <div className="select">
                                <select 
                                    value={type} 
                                    onChange={(e) => setType(e.target.value as 'personal' | 'business')}
                                >
                                    <option value="personal">Personal</option>
                                    <option value="business">Business</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="field is-grouped">
                        <div className="control">
                            <button type="submit" className="button is-link">Add Contact</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};
