import React from 'react';

const RESET_VALUES = { id: '', category: '', price: '', stocked: false, name: '' };

class ProductForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.state = {
            product: Object.assign({}, RESET_VALUES),
            errors: {}
        };
    }
    handleChange(e) {
        console.log("egegeg")
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState((prevState) => {
            if (name in prevState.errors){
                if(value.trim()==""){
                    prevState.errors[name] = true;
                }else{

                    prevState.errors[name] = false;
                }
            }
            prevState.product[name] = value;
            return { product: prevState.product };
        });
    }
    handleSave(e) {
        e.preventDefault();
        if (this.state.product.name.trim() == "") {
            this.setState((prevState) => {
                prevState.errors['name'] = true;
                return { errors: prevState.errors };
            });
        } else {
            this.props.onSave(this.state.product);
            this.setState({
                product: Object.assign({}, RESET_VALUES),
                errors: {}
            });
        }
    }
    render() {
        return (
            <form>
                <h3>Enter a new product</h3>
                <p>
                    <label>
                        Name
            <br />
                        <input type="text" name="name" onChange={this.handleChange} value={this.state.product.name} />
                        {
                            'name' in this.state.errors & this.state.errors.name ? <small style={{ color: 'red', marginLeft: '8px' }}>Name field is empty !</small> :null
                    }
                    </label>
                </p>
                <p>
                    <label>
                        Category
            <br />
                        <input type="text" name="category" onChange={this.handleChange} value={this.state.product.category} />
                    </label>
                </p>
                <p>
                    <label>
                        Price
            <br />
                        <input type="text" name="price" onChange={this.handleChange} value={this.state.product.price} />
                    </label>
                </p>
                <p>
                    <label>
                        <input type="checkbox" name="stocked" onChange={this.handleChange} checked={this.state.product.stocked} />
                        &nbsp;In stock?
          </label>
                </p>
                <input type="submit" value="Save" onClick={this.handleSave} />
            </form>
        );
    }
}

export default ProductForm;