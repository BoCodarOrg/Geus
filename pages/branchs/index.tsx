import React, { useEffect, useState } from 'react';

import axios from 'axios';
import uuid from 'react-uuid';

import { useRouter } from 'next/router';
import { Container } from '../../src/styles/main';
import List from '../../src/components/List';
import Api from '../../src/server';

export interface BranchModel {
    id?: number,
    name?: string
}


const Branchs: React.FC = () => {
    const [branches, setBranches] = useState<Array<BranchModel>>();

    const route = useRouter();

    useEffect(() => {
        async function takeBranch() {
            const response = await Api.get(`/${route.query.repoName}/`);
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
        route.push({ pathname: `/pullRequest/${uuid()}`, query: { branch: item.name, repoName: route.query.repoName, repoId: route.query.repoId } });
    }

    return (
        <Container>
            <List>
                {
                    branches ? branches.map((item, i) => {
                        return (
                            <li key={item.name} onClick={() => onHandlerClickCommit(item)}>
                                <div>
                                    <h1>{item.name.replace('*', '').trim()}</h1>
                                </div>
                                <button onClick={(e) => onHandlerCreatePullrequest(item, e)}>Create pull request</button>
                            </li>
                        )
                    }) :
                        (<p>Loading...</p>)
                }
            </List>
        </Container>
    )
};

export default Branchs;