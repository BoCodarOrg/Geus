import React, { useState, useEffect } from 'react';
import { Button, Container, Dropdown, Form } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/router';
import { BranchModel } from '../branchs';
import axios from 'axios';


const PullRequest: React.FC = () => {
    const [branches, setBranches] = useState<Array<BranchModel>>();
    const [selectedBranch, setSelectedBranch] = useState<string>();
    const [title, setTitle] = useState<string>();
    const [description, setDescription] = useState<string>();
    const route = useRouter();


    useEffect(() => {
        async function takeBranch() {
            const response = await axios.get(`http://localhost:3001/${route.query.repoName}/`);
            setBranches(response.data.data);
        }
        takeBranch();
    }, [])

    const onHandlerCreatePullRequest = () => {
        route.push({
            pathname: `/diff/${route.query.id}`,
            query: { origin: route.query.branch, destination: selectedBranch, title, description, repos: route.query.repoName }
        },)
        // alert(`will create pull request with title ${title} follow description ${description}, origin branch is ${route.query.branch} from ${selectedBranch}`)
    }

    return (
        <Container>
            <br />
            <h1>Create pull request to {route.query.branch}</h1>
            <p><b>Develop from</b></p>
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {selectedBranch || "Select branch destination"}
                </Dropdown.Toggle>
                {
                    branches && (
                        <Dropdown.Menu>
                            {
                                branches.map(item => (
                                    <Dropdown.Item key={item.name} onClick={() => { setSelectedBranch(item.name) }}>{item.name}</Dropdown.Item>
                                ))
                            }
                        </Dropdown.Menu>
                    )
                }
            </Dropdown>
            <br />
            <Form.Control type="text" placeholder="Pull request title" onChange={({ target: { value } }) => setTitle(value)} />
            <br />
            <Form.Control as="textarea" style={{ resize: 'none' }} onChange={({ target: { value } }) => setDescription(value)} rows={5} defaultValue="Describe your pull request..." />
            <br />
            <Button onClick={onHandlerCreatePullRequest}>Create pull request</Button>
        </Container>
    )
};

export default PullRequest;