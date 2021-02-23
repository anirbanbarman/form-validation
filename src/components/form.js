import React from 'react';

import './form.css';


const onlyNumberRegex = new RegExp('^[0-9]+$');
const onlyCharactersRegex = new RegExp('^[aA-zZ\s]+$');
const onlySpecialCharactersregex = new RegExp('^[!@#\$%\^\&*\)\(+=._-]+$');
const characterWithSpecialCharactersregex = new RegExp('^(([!@#\$%\^\&*\)\(+=._-]+[a-zA-Z]*)|([a-zA-Z]+[!@#\$%\^\&*\)\(+=._-]*))+$')

const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
        (val) => val.length > 0 && (valid = false)
    );
    return valid;
}

const countErrors = (errors) => {
    let count = 0;
    Object.values(errors).forEach(
        (val) => val.length > 0 && (count = count + 1)
    );
    return count;
}

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            onlyNumber: null,
            onlyCharacters: null,
            onlySpecialCharacters: null,
            characterWithSpecialCharacters: null,
            radio: null,
            select: null,

            errors: {
                onlyNumber: '',
                onlyCharacters: '',
                onlySpecialCharacters: "",
                characterWithSpecialCharacters: "",
                radio: "",
                select: ""

            }
        };
    }
    handleChange = (event) => {
        event.preventDefault();
        debugger
        const { name, value } = event.target;
        let errors = this.state.errors;

        switch (name) {

            case 'onlyNumber':
                errors.onlyNumber =
                    onlyNumberRegex.test(value)
                        ? ''
                        : 'Only numbers are allowed';
                break;
            case 'onlyCharacters':
                errors.onlyCharacters =
                    onlyCharactersRegex.test(value)
                        ? ''
                        : 'Only characters are allowed for this field ';
                break;

            case 'onlySpecialCharacters':
                errors.onlySpecialCharacters =
                    onlySpecialCharactersregex.test(value)
                        ? ''
                        : 'Only Special characters are allowed for this field ';
                break;

            case 'characterWithSpecialCharacters':
                errors.characterWithSpecialCharacters =
                    characterWithSpecialCharactersregex.test(value)
                        ? ''
                        : 'Characters With Special characters are allowed for this field ';
                break;
           
            default:
                break;
        } 

        this.setState({ errors, [name]: value });
    }


    handleChangeRadio=(event)=>{
    console.log(event.target.value)
    this.state.errors.radio =""
    this.setState({...this.state, radio: event.target.value})
    }
    handleChangeDropdown=(event)=>{
        console.log(event.target.value)
        this.state.errors.select =""
        this.setState({...this.state, select: event.target.value})
        }

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.select) {
            this.state.errors.select = ""
        }
        else {
            this.state.errors.select = " select from dropdown"
        }
        if (this.state.radio) {
            this.state.errors.radio = ""
        }
        else {
            this.state.errors.radio = "select from Radio"
        }

        this.setState({ formValid: validateForm(this.state.errors) });
        this.setState({ errorCount: countErrors(this.state.errors) });
    }

    render() {
        const { errors, formValid } = this.state;

        return (
            <div className='wrapper'>
                <div className='form-wrapper'>
                    <h2>Form Validation</h2>
                    <form onSubmit={this.handleSubmit} noValidate>

                        <div className='onlyNumber'>
                            <label htmlFor="onlyNumber">Only Numbers</label>
                            <input type='text' name='onlyNumber' onChange={this.handleChange} noValidate />
                            {errors.onlyNumber.length > 0 &&
                                <span className='error'>{errors.onlyNumber}</span>}
                        </div>

                        <div className='onlyCharacters'>
                            <label htmlFor="onlyCharacters">Only Characters</label>
                            <input type='text' name='onlyCharacters' onChange={this.handleChange} noValidate />
                            {errors.onlyCharacters.length > 0 &&
                                <span className='error'>{errors.onlyCharacters}</span>}
                        </div>

                        <div className='onlySpecialCharacters'>
                            <label htmlFor="onlySpecialCharacters">Only Special Characters</label>
                            <input type='text' name='onlySpecialCharacters' onChange={this.handleChange} noValidate />
                            {errors.onlySpecialCharacters.length > 0 &&
                                <span className='error'>{errors.onlySpecialCharacters}</span>}
                        </div>

                        <div className='characterWithSpecialCharacters'>
                            <label htmlFor="characterWithSpecialCharacters">Characters with Special Characters</label>
                            <input type='text' name='characterWithSpecialCharacters' onChange={this.handleChange} noValidate />
                            {errors.characterWithSpecialCharacters.length > 0 &&
                                <span className='error'>{errors.characterWithSpecialCharacters}</span>}
                        </div>
                        <div >
                            <input type="radio" value="value1" checked={this.state.radio==="value1"} name="radio" onChange={this.handleChangeRadio} noValidate /> Value 1
                            <input type="radio" value="value2" checked={this.state.radio==="value2"} name="radio" onChange={this.handleChangeRadio} noValidate /> Value 2
                            <input type="radio" value="value3" checked={this.state.radio==="value3"} name="radio" onChange={this.handleChangeRadio} noValidate /> Value 3

                         </div>
                        <div className='characterWithSpecialCharacters'>
                            {errors.radio.length > 0 &&
                                <span className='error'>{errors.radio}</span>}
                        </div>
                        <select
                            required
                            onChange={this.handleChangeDropdown}
                            value={this.state.select || ''}
                        >
                            <option value=''>None</option>
                            <option value='1'>option1</option>
                            <option value='2'>option2</option>

                        </select> <div className='characterWithSpecialCharacters'>
                            {errors.select.length > 0 &&
                                <span className='error'>{errors.select}</span>}
                        </div>

                        <div className='submit'>
                            <button>Check </button>
                        </div>
                        {this.state.errorCount !== null ? <p className="form-status">Form is {formValid ? 'valid ✅' : 'invalid ❌'}</p> : 'Form not submitted'}
                    </form>
                </div>
            </div>
        );
    }

}

export default Form;