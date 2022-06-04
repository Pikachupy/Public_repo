import {useState, useEffect, useCallback} from "react";
import Airtable from "airtable";

interface InputFormProps {
    defaultValue?: string;
}

const storageFormKey = 'inputValue';
/*
interface RMRResponseItem {
    created: string;
    episode: Array<string>
    gender: string
    id: number | string
    image: string;
    location: { name: string, url: string }
    name: string
    origin: { name: string, url: string}
    species: string
    status: string
    type: string
    url: string
}*/

const apiKey = process.env.REACT_APP_AIRTABLE_API_KEY
const dbId = process.env.REACT_APP_AIRTABLE_API_TEST_DB_ID
const base = new Airtable({apiKey}).base(`${dbId}`);

// const useApi = () => {
//     const handleNewRecord = (Name: string) => {
//         base('Table 1').create([
//             {
//                 fields: {
//                     Name,
//                 }
//             }
//         ], function(err, records:any) {
//             if (err) {
//                 console.error(err);
//                 return;
//             }
//             // records.forEach(function (record: any) {
//             //     console.log(record.getId());
//             // });
//             alert(`Value saved! Your value: ${records[0].Name}`);
//             handleGetAll();
//         });
//
//     }

//     const handleGetAll = () => {
//         let arr: Array<string> = [];
//
//         base('Table 1')
//
//             .select({})
//             .eachPage(function page(records, fetchNextPage){
//                 arr = [...records.map(item => item.fields.Name) as Array<string>]
//                 fetchNextPage();
//             }, function done(err){
//                 if (err) { console.error(err); return;}
//             });
//
//     }
//     return {
//         handleNewRecord,
//         handleGetAll
//     }
//
// }


// const {handleNewRecord, handleGetAll} = useApi()
export const InputForm = (props?: InputFormProps) => {

    const [displayError, setDisplayError] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>('pusta wartość')
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [names, setNames] = useState<Array<string>>([]);
    const formReadyToSubmit = !(displayError || !inputValue);

    const handleInputChange = (event: any) => {
        const messageLength = event.target.value.length;
        setInputValue(event.target.value);
        if (messageLength < 3 || messageLength > 20) {
            if (messageLength < 3) {

                setErrorMessage('User name is too short')
            }

            if (messageLength > 20) {
                setErrorMessage('User name is too long')

                setErrorMessage('User name are to short')
            }

            if (messageLength > 20) {
                setErrorMessage('User name are to long')

            }

            setDisplayError(true)
        } else {
            setDisplayError(false)
            setErrorMessage('')
        }
    }

    const handleSubmit = useCallback(() => {
        if (formReadyToSubmit) {
            handleNewRecord();
            setInputValue('');

        }
    }, [inputValue, formReadyToSubmit])

    const handleNewRecord = () => {
        base('Table 1').create([
            {
                "fields": {
                    "Name": inputValue
                }
            }
        ], function(err, records:any) {
            if (err) {
                console.error(err);
                return;
            }
            // records.forEach(function (record: any) {
            //     console.log(record.getId());
            // });
            alert(`Value saved! Your value: ${records[0].Name}`);
            setInputValue('');
            handleGetAll();
        });

    }

    const handleGetAll = () => {

        base('Table 1')
            .select({})
            .eachPage(function page(records, fetchNextPage){

                setNames(records.map(item => item.fields.Name) as Array<string>)
                // records.forEach(function(record) {
                //     console.log('Retrieved', record.get('Name'));
                // });

                fetchNextPage();
            }, function done(err){
                if (err) { console.error(err); return;}
            });

    }


    useEffect(() => {

        let valueToSet = '';
        const localStorageData = localStorage.getItem(storageFormKey)
        if (!!localStorageData) {
            valueToSet = localStorageData;
        } else {
            if (!!props?.defaultValue) {
                valueToSet = props?.defaultValue;
            }
        }


        // const fetchImages = async () => {
        //
        //     base('Table 1')
        //         .select({})
        //         .eachPage(function page(records, fetchNextPage){
        //         records.forEach(function(record) {
        //             console.log('Retrieved', record.get('Name'));
        //         });
        //
        //         fetchNextPage();
        //     }, function done(err){
        //         if (err) { console.error(err); return;}
        //     });
        //
        //     // await fetch("https://rickandmortyapi.com/api/character")
        //     //     .then((res) => res.json())
        //     //     .then((data) => data.results)
        //     //     .then((results) => console.log(results.map(item:any) => item));
        // };
        setInputValue(valueToSet);
        handleGetAll();
    }, [props])

    console.log(names)

    return <div style={{display: "flex", flexDirection: 'column'}}>
        {displayError && <div style={{color: 'red'}}>{errorMessage}</div>}
        <div>User name:</div>
        <input onInput={handleInputChange} value={inputValue} type="text"/>
        <br/>
        <button onClick={handleSubmit} disabled={!formReadyToSubmit}>submit data</button>
        <ul>{names.map((item,index) => <li key={`${index}`}>{item}</li>)}</ul>
    </div>
}
