import { useEffect, useState } from 'react';
import './App.css';
import InputForm from './component/InputForm';
import { v4 as uuidv4 } from 'uuid';
import { AiOutlineEdit } from 'react-icons/ai';
import { AiFillDelete } from 'react-icons/ai';

function App() {
  const [record,setRecord]=useState([
    {
      name: 'Frozen Yogurt',
      calories: 159,
      fat: 6.0,
      carbs: 24,
      protein: 4.0,
      iron: '1',
      id: 1
    },
    {
      name: 'Jelly bean',
      calories: 375,
      fat: 0.0,
      carbs: 94,
      protein: 0.0,
      iron: '0',
      id: 2
    },
    {
      name: 'KitKat',
      calories: 518,
      fat: 26.0,
      carbs: 65,
      protein: 7,
      iron: '6',
      id: 3
    },
    {
      name: 'Eclair',
      calories: 262,
      fat: 16.0,
      carbs: 23,
      protein: 6.0,
      iron: '7',
      id: 4
    },
    {
      name: 'Gingerbread',
      calories: 356,
      fat: 16.0,
      carbs: 49,
      protein: 3.9,
      iron: '16',
      id: 5
    },
    {
      name: 'Ice cream sandwich',
      calories: 237,
      fat: 9.0,
      carbs: 37,
      protein: 4.3,
      iron: '1',
      id: 6
    },
    {
      name: 'Lollipop',
      calories: 392,
      fat: 0.2,
      carbs: 98,
      protein: 0,
      iron: '2',
      id: 7
    },
    {
      name: 'Cupcake',
      calories: 305,
      fat: 3.7,
      carbs: 67,
      protein: 4.3,
      iron: '8',
      id: 8
    },
    {
      name: 'Honeycomb',
      calories: 408,
      fat: 3.2,
      carbs: 87,
      protein: 6.5,
      iron: '45',
      id: 9
    },
    {
      name: 'Donut',
      calories: 452,
      fat: 25.0,
      carbs: 51,
      protein: 4.9,
      iron: '22',
      id: 10
    },
  ])
  const [desserts, setDesserts] = useState(record);
  const [formVal, setFormVal] = useState({
    calories: '',
    fat: '',
    carbs: '',
    protein: '',
    iron: '',
    name: '',
  })

  const [query, setQuery] = useState('');
  const [editItem, setEditItem] = useState('');
  useEffect(()=>{
    let filteredDessert=[...record].filter((dessert)=>{
      return dessert.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
    })
    setDesserts(filteredDessert);
  },[query])
  const onChange = (e) => {
    setFormVal({ ...formVal, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formVal.name !== '' && formVal.calories !== '' && formVal.fat !== ''
      && formVal.carbs !== '' && formVal.iron !== '' && formVal.protein !== '' && editItem === '') {
      let uid = uuidv4();
      let newFormVal = { ...formVal, id: uid };
      setDesserts([...desserts, newFormVal]);
      Object.keys(formVal).forEach(k => formVal[k] = '')
      setFormVal({ ...formVal });
    } else if (formVal.name !== '' && formVal.calories !== '' && formVal.fat !== ''
      && formVal.carbs !== '' && formVal.iron !== '' && formVal.protein !== '' && editItem !== '') {
      setDesserts(
        desserts.map((ele) => {
          if (ele.id === editItem) {
            return {
              ...ele,
              name: formVal.name,
              calories: formVal.calories,
              fat: formVal.fat,
              carbs: formVal.carbs,
              protein: formVal.protein,
              iron: formVal.iron
            }
          }
          else {
            return ele;
          }
        })
      )
      setEditItem('');
      Object.keys(formVal).forEach(k => formVal[k] = '')
      setFormVal({ ...formVal });
    }
    else {
      alert('please fill all the input fields')
    }
  }
  const handleDelete = (id) => {
    let colneDesserts = [...desserts].filter((item) => item.id !== id)
    setDesserts(colneDesserts);
  }
  const handleEdit = (id) => {
    let newEditItem = desserts.find((ele) => {
      return ele.id === id;
    })
    setFormVal(newEditItem);
    setEditItem(id);
  }

  const [sortedListBYName, setSortedListByName] = useState('ASC');
  const [sortedListByNumbers, setSortedListByNumbers] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const recordPerPage = 5;
  const npage = Math.ceil(desserts.length / recordPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);
  const lastIndex = currentPage * recordPerPage;
  const firstIndex = lastIndex - recordPerPage;
  let records = desserts.slice(firstIndex, lastIndex);
  const prepage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }
  const changeCurrentPage = (id) => {
    setCurrentPage(id)
  }
  const nextpage = () => {
    if (currentPage !== lastIndex) {
      setCurrentPage(currentPage + 1);
    }
  }
  const handleNameSort = () => {
    if (sortedListBYName === 'ASC') {
      let sortedDesserts = desserts.sort(function (a, b) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
      setDesserts([...sortedDesserts]);
      setSortedListByName('DSC')
    } else {
      let sortedDesserts = desserts.sort(function (a, b) {
        if (a.name > b.name) {
          return -1;
        }
        if (a.name < b.name) {
          return 1;
        }
        return 0;
      });
      setDesserts([...sortedDesserts]);
      setSortedListByName('ASC')
    }
  }
  const handlesort = (type) => {
    if (sortedListByNumbers === 0) {
      let sortedList = desserts.sort((a, b) => {
        return a[type] - b[type]
      });
      setDesserts([...sortedList]);
      setSortedListByNumbers(1)
    } else {
      let sortedList = desserts.sort((a, b) => {
        return b[type] - a[type]
      });
      setDesserts([...sortedList]);
      setSortedListByNumbers(0);
    }
  }
  return (
    <div className="App">
      <form className='input-div' onSubmit={handleSubmit}>
        <h1>Enter the Details</h1>
        <div className='input-wrapper'>
          <InputForm label='Dessert Name' placeholder='enter desert name' name='name' onChange={onChange} type='text' value={formVal.name} />
          <InputForm cla='float-right' label='Calories' placeholder='enter calories value' name='calories' onChange={onChange} type='number' value={formVal.calories} />
          <InputForm label='Fat' placeholder='enter fat value' name='fat' onChange={onChange} type='number' value={formVal.fat} />
          <InputForm label='Carbs' placeholder='enter carbs value' name='carbs' onChange={onChange} type='number' value={formVal.carbs} />
          <InputForm label='Protin' placeholder='enter protin value' name='protein' onChange={onChange} type='number' value={formVal.protin} />
          <InputForm label='Iron' placeholder='enter iron value' name='iron' onChange={onChange} type='number' value={formVal.iron} />
        </div>
        <div className='submit-button-div'>
          <button className='submit-button'>Add</button>
        </div>
      </form>
      <input type='search' onChange={(e) => setQuery(e.target.value)} value={query} />
      <table>
        <thead>
          <tr>
            <th onClick={handleNameSort}>Dessert Name</th>
            <th onClick={() => handlesort('calories')}>Calories</th>
            <th onClick={() => handlesort('fat')}>Fat(g)</th>
            <th onClick={() => handlesort('carbs')}>Carbs(g)</th>
            <th onClick={() => handlesort('protein')}>Protin(g)</th>
            <th onClick={() => handlesort('iron')}>iron(%)</th>
          </tr>
        </thead>
        <tbody>
          {records.map((item) => {
            return (
              <tr key={item.id}>
                <td><AiOutlineEdit onClick={() => handleEdit(item.id)} />{item.name}<AiFillDelete onClick={() => handleDelete(item.id)} /></td>
                <td>{item.calories}</td>
                <td>{item.fat}</td>
                <td>{item.carbs}</td>
                <td>{item.protein}</td>
                <td>{item.iron}</td>
              </tr>
            )
          })
          }
        </tbody>
      </table>
      <nav>
        <div className='pagination'>
          <li className='page-item'>
            <button className='page-link' disabled={currentPage === 1} onClick={prepage}>Prev</button>
          </li>
          {
            numbers.map((n, i) => {
              return (
                <li className='page-item' key={i}>
                  <button className={`page-link ${currentPage === n ? 'active' : ''}`} onClick={() => changeCurrentPage(n)}>{n}</button>
                </li>
              )
            })
          }
          <li className='page-item'>
            <button className='page-link' disabled={currentPage === npage} onClick={nextpage}>Next</button>
          </li>
        </div>
      </nav>
    </div>
  );
}

export default App;

