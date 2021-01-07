import React, { useEffect, useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';


import { Button, Container, Table } from 'react-bootstrap';
import axios from 'axios';
import uuid from 'react-uuid';

import { useRouter } from 'next/router';

export interface BranchModel {
    id?: number,
    name?: string
}


const Branchs: React.FC = () => {
    const [branches, setBranches] = useState<Array<BranchModel>>();

    const route = useRouter();

    useEffect(() => {
        async function takeBranch() {
            const response = await axios.get(`http://localhost:3001/${route.query.repoName}/`);
            setBranches(response.data.data);
        }
        takeBranch();
    }, [branches])

    const onHandlerClickCommit = (item) => {
        route.push({
            pathname: `/commits/${item.name}`,
            query: { repos: route.query.repoName }
        });
    }

    const onHandlerCreatePullrequest = (item, e) => {
        e.stopPropagation();
        route.push({ pathname: `/pullRequest/${uuid()}`, query: { branch: item.name, repoName: route.query.repoName } });
    }

    return (
        <Container>
            <br />
            <h1>Branches List</h1>
            <Table striped bordered hover variant="dark" >
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Branch Name</th>
                        <th>Pull request</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        branches ? branches.map((item, i) => {
                            return (
                                <tr key={item.name} onClick={() => onHandlerClickCommit(item)}>
                                    <th>{i}</th>
                                    <th>{item.name}</th>
                                    <th><Button variant="primary"
                                        onClick={(e) => onHandlerCreatePullrequest(item, e)}>Create pull request</Button></th>
                                </tr>
                            )
                        }) :
                            (<tr><th>Loading...</th></tr>)
                    }

                </tbody>
            </Table>
        </Container>
    )
};

export default Branchs;