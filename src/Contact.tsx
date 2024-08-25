import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetContactQuery } from './contactsApi';
import { useGetPhonesQuery, useAddPhoneMutation, useUpdatePhoneMutation, useDeletePhoneMutation } from './phoneApi';
import { useGetEmailsQuery, useAddEmailMutation, useUpdateEmailMutation, useDeleteEmailMutation } from './emailApi';
import { PhoneType, EmailType } from './types';

export const Contact = () => {
    const { id } = useParams<{ id: string }>();
    const { data: contact } = useGetContactQuery(id!);
    console.log('Contact: ', contact);
    const { data: phones, isLoading: isPhonesLoading } = useGetPhonesQuery(id!);
    const [addPhone] = useAddPhoneMutation();
    const [updatePhone] = useUpdatePhoneMutation();
    const [deletePhone] = useDeletePhoneMutation();

    const [newPhone, setNewPhone] = useState('');
    const [phoneLabel, setPhoneLabel] = useState('');

    const { data: emails, isLoading: isEmailsLoading } = useGetEmailsQuery(id!);
    const [addEmail] = useAddEmailMutation();
    const [updateEmail] = useUpdateEmailMutation();
    const [deleteEmail] = useDeleteEmailMutation();

    const [newEmail, setNewEmail] = useState('');
    const [emailLabel, setEmailLabel] = useState('');

    const handleAddPhone = async () => {
        try {
            await addPhone({ contact_id: id, phone_number: newPhone, label: phoneLabel }).unwrap();
            setNewPhone('');
            setPhoneLabel('');
        } catch (err) {
            console.error('Failed to add phone: ', err);
        }
    };

    const handleAddEmail = async () => {
        try {
            await addEmail({ contact_id: id, email_address: newEmail, label: emailLabel }).unwrap();
            setNewEmail('');
            setEmailLabel('');
        } catch (err) {
            console.error('Failed to add email: ', err);
        }
    };

    if(!contact) {
        return <div className="notification is-info">Loading contact...</div>;
    }

    return (
        <div className="box">
            <h2 className="title">{contact.name}</h2>
            <p className="subtitle">{contact.type.charAt(0).toUpperCase() + contact.type.slice(1)} Contact</p>

            <div className="box">
                <h3 className="title is-5">Phones</h3>
                {isPhonesLoading ? (
                    <div className="notification is-info">Loading phones...</div>
                ) : (
                    <ul>
                        {phones && phones.map((phone: PhoneType) => (
                            <li key={phone.id} className="media">
                                <div className="media-content">
                                    <p className="title is-6">{phone.phone_number}</p>
                                    <p className="subtitle is-7">{phone.label}</p>
                                </div>
                                <div className="media-right">
                                    <button
                                        className="button is-small is-danger"
                                        onClick={() => deletePhone(phone.id).unwrap()}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
                <div className="field">
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            placeholder="New phone number"
                            value={newPhone}
                            onChange={(e) => setNewPhone(e.target.value)}
                        />
                    </div>
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            placeholder="Label"
                            value={phoneLabel}
                            onChange={(e) => setPhoneLabel(e.target.value)}
                        />
                    </div>
                    <div className="control">
                        <button className="button is-link" onClick={handleAddPhone}>
                            Add Phone
                        </button>
                    </div>
                </div>
            </div>

            <div className="box">
                <h3 className="title is-5">Emails</h3>
                {isEmailsLoading ? (
                    <div className="notification is-info">Loading emails...</div>
                ) : (
                    <ul>
                        {emails && emails.map((email: EmailType) => (
                            <li key={email.id} className="media">
                                <div className="media-content">
                                    <p className="title is-6">{email.email_address}</p>
                                    <p className="subtitle is-7">{email.label}</p>
                                </div>
                                <div className="media-right">
                                    <button
                                        className="button is-small is-danger"
                                        onClick={() => deleteEmail(email.id).unwrap()}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
                <div className="field">
                    <div className="control">
                        <input
                            className="input"
                            type="email"
                            placeholder="New email"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                        />
                    </div>
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            placeholder="Label"
                            value={emailLabel}
                            onChange={(e) => setEmailLabel(e.target.value)}
                        />
                    </div>
                    <div className="control">
                        <button className="button is-link" onClick={handleAddEmail}>
                            Add Email
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
