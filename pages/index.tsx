import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'

import { Container, FormRow } from '../src/styles/main';
import List from '../src/components/List';
import Title from '../src/components/Title';
import { Status } from '../src/styles/pullrequest';
import Api from '../src/server';

export interface RepoModel {
    id?: number,
    name?: string
    description?: string
    language?: string
    create_at: string
}


const App: React.FC = () => {
    const [repos, setRepos] = useState<Array<RepoModel>>();
    const [pullrequests, setPullRequests] = useState([]);

    const [titleRepository, setTitleRepository] = useState<string>();
    const [descriptionRepository, setDescriptionRepository] = useState<string>();
    const [languageRepository, setLanguageRepositoru] = useState<string>();

    const route = useRouter();

    const languages = [
        { value: 'JavaScript' },
        { value: 'Kotlin' },
        { value: 'Java' },
        { value: 'React' },
        { value: 'React Native' },
        { value: 'Flutter' },
        { value: 'Node' },
        { value: 'Deno' },
        { value: 'Swift' },
        { value: 'Plain Text' },
    ]

    useEffect(() => {

        async function takePullrequests() {
            const response = await Api.get('/pullrequests/index');
            setPullRequests(response.data.data);
        }

        takePullrequests();
        takeRepositories();
    }, [])

    async function takeRepositories() {
        const response = await Api.get('/');
        setRepos(response.data.data);
    }

    const onHandlerClickRepository = (item) => {
        route.push({
            pathname: '/branchs',
            query: { repoName: item.name.replace('/', ''), repoId: item.id }
        });
    }

    const onHandlerClickPullRequest = (item) => {
        route.push({
            pathname: `/diff/${item.hash}`,
            query: {
                status: item.status,
                title: item.title,
                author: item.User.user,
                description: item.description,
                origin: item.origin,
                destination: item.destination,
                repos: item.Repository.name,
                prId: item.id
            }
        })
    }

    const onHandlerCreateRepository = async () => {
        if (titleRepository) {
            const result: any = await Api.post("/createRepository", {
                name: titleRepository,
                description: descriptionRepository,
                language: languageRepository || ''
            });

            if (!result.error) {
                takeRepositories();
            } else {
                alert(result.data);
            }
        } else {
            alert("O Nome do repositório não pode ser vazio")
        }

    }


    return (
        <Container>
            <Title>Criar novo repositório</Title>
            <FormRow>
                <input type="text" placeholder="Nome do repositório" onChange={({ target: { value } }) => setTitleRepository(value)} />
                <input type="text" placeholder="Descrição" onChange={({ target: { value } }) => setDescriptionRepository(value)} />
                <select onChange={({ target: { value } }) => setLanguageRepositoru(value)}>
                    {
                        languages.map(item => {
                            return (
                                <option key={item.value} value={item.value}>{item.value}</option>

                            )

                        })
                    }
                </select>
                <button className="link" onClick={onHandlerCreateRepository}>Criar Repositório</button>
            </FormRow>
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
                        <li key={item.id} onClick={() => onHandlerClickPullRequest(item)}>
                            <Status status={item.status} className="inline" style={{ marginRight: '20px' }} />
                            <p className="inline bold">{item.User.user}</p><p className="inline">/{item.Repository.name}</p><p className="inline gray" style={{ marginLeft: '10px' }}>{item.title}</p>
                            <p>Criado: {item.create_at.split('T')[0]} | {item.status === 0 ? 'Aberto' : item.status === 1 ? 'Aprovado' : 'Rejeitado'}</p>
                        </li>
                    ))
                }
            </List>
        </Container>

    );
}

export default App;