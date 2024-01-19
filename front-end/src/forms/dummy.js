
const [days, setDays] = useState('');  // Add this line
const [hint, setHint] = useState(''); 
const [daysError, setDaysError] = useState('');
const [hintError, setHintError] = useState('');
const [data, setData] = useState({
    time: '',
    days: '',
    hint: '',
    notification: true
})

/* validate 1 <= days <= 100 */
function handleDaysChange(event) {
    const days_value = event.target.value;
    setDays(days_value);
    setDaysError(
        days_value < 1 || days_value > 100 
            ? 'Days must be 1 and 100' 
            : ''
    );
    if(!daysError){
        setData((prevData) => ({ ...prevData, days: days_value }));
        console.log(data);
    }
};

/* hint 1 <= Char <= 100 */
function handleHintChange(event) {
    const hint_value = event.target.value;
    setHint(hint_value);
    setHintError(
        hint_value.length < 1 || hint_value.length > 100 
            ? 'Hint must be 1 and 100 characters' 
            : ''
    );
    if (!hintError) {
        setData((prevData) => ({ ...prevData, hint: hint_value }));
        console.log(data);
    }
}

/* handle form submition for post the data to server */
const submit = async(e) => {
    try {
        setData({...data, days: days, hint: hint})
        e.preventDefault();
        if(!daysError && !hintError){
            const scheduleInserted = await axios.post('http://localhost:3030/schedule/form', data);
            scheduleInserted.data.inserted
                ? alert('form submited successfully')
                : alert('Schedule already exist, please Schedule a new one')
            navigate('/schedule/data');
        }         
    } catch (error) {
        console.error('Error posting data:', error);
    }
}