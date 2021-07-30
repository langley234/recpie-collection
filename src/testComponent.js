import React from 'react';

let students = [{name: 'jim'}, {name:'tom'}];

class TestComponent extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            students: []
        }
    }

    componentDidMount() {
        this.setState({
            students: students
        })
    }

    render() {
        return (
            <div>
                <h1>{this.state.students}</h1>
            </div>
        );
    }
}

export default TestComponent;