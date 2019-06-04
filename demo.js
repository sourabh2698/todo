import react from 'react';

class App extends React.Component {

    constructor(props) {
        super(props)
        this.state={}
        this.state.number =1;
        this.increase= this.increase.bind(this)
    }

    increase(){
        let n = this.state.number;
        n++;
        this.setState(
            {number:n}
        )
    }



    render() {
        return (<div>
            <h1>{this.state.number}</h1>
            <button onClick={this.increase} >increase</button>
            <button>decrease</button>
            <button>timer</button>
            </div>
    )
    }

}


export default App;