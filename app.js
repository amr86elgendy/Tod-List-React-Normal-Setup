
class App extends React.Component {
  state = {
    items: [],
    item: "",
    id: 0,
    editItem: false
  }
  handleChange = (e) => {
    this.setState({
      item: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      id: this.state.id, title: this.state.item
    }
    if (!this.state.item) return false;
    this.setState({
      items: [...this.state.items, newItem],
      item: '',
      id: this.state.id + 1,
      editItem: false
    })
  }
  handleDelete = (id) => {
    const newItems = this.state.items.filter(item => item.id !== id);
    this.setState({
      items: newItems
    });
    console.log(this.state.items);
  }
  handleEdit = (id) => {
    const item = this.state.items.find(item => item.id === id)
    const newItems = this.state.items.filter(item => item.id !== id);
    console.log(item);
    this.setState({
      items: newItems,
      item: item.title,
      editItem: true
    })
  }
  clearAll = () => {
    this.setState({
      items: []
    })
  }
  render() {

    return (
      <div className="col-10 mx-auto col-md-8 mt-5">
        <h3 className="text-capitalize text-center">todo input</h3>
        <div className="card card-body my-3">
          <form onSubmit={this.handleSubmit}>
            <div className="input-group">
              <div className="input-group-prepend">
                <div className={this.state.editItem ? "input-group-text bg-success text-white" : "input-group-text bg-primary text-white"}>
                  <i className="fas fa-book "></i>
                </div>
              </div>
              <input type="text" className="form-control text-capitalize" placeholder="add todo item" value={this.state.item} onChange={this.handleChange} />
            </div>
            <button type="submit" className={this.state.editItem ? "btn btn-block btn-success mt-3 text-capitalize" : "btn btn-block btn-primary mt-3 text-capitalize"}>{this.state.editItem ? "edit item" : "add item"}</button>
          </form>
        </div>
        <ul className="list-group my-5">
          <h3 className="text-capitalize text-center">todo list</h3>
          {this.state.items.map(item => {
            return (
              <li className="list-group-item text-capitalize d-flex justify-content-between my-2" key={item.id}>
                <h6>{item.title}</h6>
                <div className="todo-icon">
                  <span className="btn p-0 mx-2 text-success">
                    <i className="fas fa-pen" onClick={() => this.handleEdit(item.id)}></i>
                  </span>
                  <span className="btn p-0 mx-2 text-danger">
                    <i className="fas fa-trash" onClick={() => this.handleDelete(item.id)}></i>
                  </span>
                </div>
              </li>
            )
          })}
          <button type="submit" className="btn btn-block btn-danger mt-5 text-capitalize" onClick={this.clearAll}>clear list</button>
        </ul>
      </div>
    );
  }
}

const domContainer = document.querySelector('#demo');
ReactDOM.render(<App />, domContainer)