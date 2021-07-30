import React from 'react';

class Recipe extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            name: props.data.name,
            instructions: props.data.instructions,
            clicked: false,
            isBeingEdited: false
        }
    }

    handleClickEvent = () => {
        this.setState({
            clicked: !this.state.clicked
        })
    }

    editCallback = () => {
        this.setState({
            isBeingEdited: !this.state.isBeingEdited
        })
    }

    finishEditCallback = (event) => {
        event.preventDefault();

        let name = document.getElementById(`edit-name-input-${this.props.data.id}`).value;
        let instructions = document.getElementById(`edit-instructions-input-${this.props.data.id}`).value;

        this.setState({
            name: name,
            instructions: instructions,
            clicked: false,
            isBeingEdited: false
        })
    }

    render() {
        return (
            <div data-testid={`recipe-${this.props.data.id}`}>
                <li aria-label={this.state.name} >
                    <div data-testid={`recipe-${this.props.data.id}-name`} onClick={this.handleClickEvent}>{this.state.name}</div>
                    {this.state.clicked ? 
                    <div data-testid={`recipe-${this.props.data.id}-instructions`}>
                        {`${this.state.instructions}`}
                        <button data-testid={`recipe-${this.props.data.id}-edit-button`} onClick={this.editCallback}>Edit</button>
                        {
                            this.state.isBeingEdited ? 
                            <form>
                                <label for={this.state.name}>Recipe Name</label>
                                <input type="text" data-testid={`edit-name-input-${this.props.data.id}`} id={`edit-name-input-${this.props.data.id}`}></input>
                                <label for={this.state.instructions}>Instructions</label>
                                <input type="text" data-testid={`edit-instructions-input-${this.props.data.id}`} id={`edit-instructions-input-${this.props.data.id}`}></input>
                                <button data-testid={`recipe-${this.props.data.id}-finish-edit-button`} onClick={this.finishEditCallback}>Save Changes</button>
                            </form> :
                            <div></div>
                        }
                    </div> : 
                    <div></div>}   
                </li>
            </div>
        );
    }
}

export default Recipe;