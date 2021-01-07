import React, { useEffect, useState } from 'react';
import { Router, useRouter } from 'next/router'

import Table from 'react-bootstrap/Table'

import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Container } from 'react-bootstrap';

export interface RepoModel {
    id?: number,
    name?: string
}

const App: React.FC = () => {
    const [repos, setRepos] = useState<Array<RepoModel>>();
    const route = useRouter();

    useEffect(() => {
        async function takeRepositories() {
            const response = await axios.get('http://localhost:3001/');
            setRepos(response.data.data);
        }

        takeRepositories();
    }, [repos])


    const onHandlerClickRepository = (item) => {
        route.push({
            pathname: '/branchs',
            query: { repoName: item.name.replace('/', '') }
        });
    }

    return (
        <Container>
            <br />
            <h1>Repositories List</h1>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Repository Name</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        repos ? repos.map((item, i) => {
                            return (
                                <tr key={item.name} onClick={() => onHandlerClickRepository(item)}>
                                    <td>{i}</td>
                                    <td>{item.name}</td>
                                </tr>
                            )
                        })
                            :
                            (<th><tr>Loading...</tr></th>)
                    }

                </tbody>
            </Table>
        </Container>

    );
}

export default App;