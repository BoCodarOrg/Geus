import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'

import axios from 'axios';
import { Container } from '../src/styles/main';
import List from '../src/components/List';
import Title from '../src/components/Title';

export interface RepoModel {
    id?: number,
    name?: string
    description?: string
    language?: string
}


const App: React.FC = () => {
    const [repos, setRepos] = useState<Array<RepoModel>>();
    const [pullrequests, setPullRequests] = useState([]);
    const route = useRouter();

    useEffect(() => {
        async function takeRepositories() {
            const response = await axios.get('http://localhost:3001/');
            setRepos(response.data.data);
        }


        async function takePullrequests() {
            const response = await axios.get('http://localhost:3001/pullrequests/index');
            setPullRequests(response.data.data);
        }

        takePullrequests();
        takeRepositories();
    }, [])


    const onHandlerClickRepository = (item) => {
        route.push({
            pathname: '/branchs',
            query: { repoName: item.name.replace('/', ''), repoId: item.id }
        });
    }

    const onHandlerClickPullRequest = (item) => {

    }

    return (
        <Container>
            <Title>Repositórios</Title>
            <br />
            <List>
                {
                    repos ? repos.map((item, i) => {
                        return (
                            <li key={item.id} onClick={() => onHandlerClickRepository(item)}>
                                <div>
                                    <div>
                                        <h1>{item.name}</h1>
                                        <p>{item.description}</p>
                                    </div>
                                    <div>
                                        <p className="language" >Linguagem principal do repositório: {item.language}</p>
                                    </div>
                                </div>

                            </li>
                        )
                    })
                        :
                        (<li>Loading...</li>)
                }

            </List>
            <br />
            <Title>Pull Requests</Title>
            <br />
            <List>
                {
                    pullrequests && pullrequests.map(item => (
                        <li key={item.id} onClick={() => onHandlerClickRepository(item)}>
                            <div>
                                <div>
                                    <h1>{item.title}</h1>
                                    <p>{item.description}</p>
                                </div>
                            </div>

                        </li>
                    ))
                }
            </List>
        </Container>

    );
}

export default App;