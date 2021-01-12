import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Container } from '../../src/styles/main';
import Table from '../../src/components/Table';


export interface CommitModel {
    commit?: string
    author?: string
    email?: string
    date?: string
    message?: string

}

const Commits: React.FC = () => {
    const [commits, setCommits] = useState<Array<CommitModel>>();

    const route = useRouter();

    useEffect(() => {
        async function takeCommit() {
            const { branch, repos } = route.query;
            const response = await axios.get(`http://localhost:3001/${repos}/${branch}/commits`);
            console.log(response.data)
            setCommits(response.data.data);
        }

        takeCommit();
    }, [])

    return (
        <Container>
            <Table  >
                <thead>
                    <tr>
                        <th>Commit</th>
                        <th>Message</th>
                        <th>Author</th>
                        <th>Email</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        commits ? commits.map((item, i) => (
                            <tr>
                                <th>{item.commit}</th>
                                <th>{item.message}</th>
                                <th>{item.author}</th>
                                <th>{item.email}</th>
                                <th>{item.date}</th>
                            </tr>
                        ))
                            : <tr><th>Loading...</th></tr>
                    }
                </tbody>
            </Table>
        </Container>
    )
}

export default Commits;