// client/src/components/CreateAlarm.js
import { Component } from "react";

class CreateAlarm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: "",
      text: "",
      loading: false,
      error: null
    };
  }

  onInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = async (e) => {
    e.preventDefault();
    
    if (this.state.time === '' || this.state.text === '') {
      alert('Заполните все поля');
      return;
    }

    this.setState({ loading: true, error: null });

    try {
     
      const response = await fetch('http://localhost:5000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          time: this.state.time,
          text: this.state.text
        })
      });

      if (!response.ok) {
        throw new Error('Ошибка при создании будильника');
      }

      const data = await response.json();
      
      if (this.props.onAddItem) {
        this.props.onAddItem(data);
      }

      
      this.setState({
        time: '',
        text: '',
        loading: false
      });

    

    } catch (error) {
      this.setState({
        error: error.message,
        loading: false
      });
      alert('Ошибка: ' + error.message);
    }
  };

  render() {
    const { time, text, loading, error } = this.state;
    
    return (
      <div>
        <h2>Создать будильник</h2>
        {error && <div style={{color: 'red'}}>{error}</div>}
        <form onSubmit={this.onSubmit}>
          <input 
            type="time" 
            name="time" 
            value={time} 
            onChange={this.onInput}
            disabled={loading}
          />
          <input 
            type="text" 
            placeholder="Текст" 
            name="text" 
            value={text} 
            onChange={this.onInput}
            disabled={loading}
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Создание...' : 'Добавить'}
          </button>
        </form>
      </div>
    );
  }
}

export default CreateAlarm;