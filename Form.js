import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Form extends Component {
    static propTypes = {
        people: PropTypes.array.isRequired,
        isLoading: PropTypes.bool.isRequired,
        saveStatus: PropTypes.string.isRequired,
        fields: PropTypes.object,
        onSubmit: PropTypes.func.isRequired,
    };

    state = {
        fields: this.props.fields || {
            name: '',
            email: '',
            cource: null,
            department: null,
        },
    };

    handleSubmit = evt => {
        const person = this.state.fields;

        evt.preventDefault();

        this.props.onSubmit([...this.props.people, person]);

    };

    inputChange = (evt) => {
        const fields = Object.assign({}, this.state.fields);

        fields[evt.target.name] = evt.target.value;

        this.setState({ fields });
    }

    getDerivedStateFromProps(update) {
        console.log('this.props.fields', this.props.fields, update);

        return { fields: update.fields };
    }

    render() {
        if (this.props.isLoading) {
            return <p>Loading.....!</p>
        };

        let status = this.props.saveStatus;

        if (status == 'SUCCESS') status = 'READY';

        console.log(status);

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input
                        placeholder='Name'
                        name='name'
                        onChange={this.inputChange}
                        value={this.state.fields.name}
                    />

                    <input
                        placeholder='Email'
                        name='email'
                        onChange={this.inputChange}
                        value={this.state.fields.email}
                    />
                    <input type="submit" />
                </form>
                <div>
                    People
                    {
                        this.props.people.map((person, id) => {
                            return (
                                <h4 key={id}>{person.name} - {person.email}</h4>
                            )
                        })
                    }
                </div>
            </div>
        );
    }
}

export default Form;