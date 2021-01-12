import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { BranchModel } from '../branchs';
import axios from 'axios';
import { Container } from '../../src/styles/main';
import Row from '../../src/components/Row';
import { Reviewers, IconReviewer, ContainerReviewer } from '../../src/styles/pullrequest';
import { getRandomColor } from "../../src/util/randomCollors";

export interface UserModel {
    name: string,
    id: number
}

const PullRequest: React.FC = () => {
    const [branches, setBranches] = useState<Array<BranchModel>>();
    const [selectedBranch, setSelectedBranch] = useState<string>();
    const [title, setTitle] = useState<string>();
    const [description, setDescription] = useState<string>();
    const [users, setUsers] = useState<Array<UserModel>>();
    const [reviewers, setReviewers] = useState<Array<UserModel>>([]);
    const [userField, setUserField] = useState<string>()
    const [hasDiff, setHasDiff] = useState(false);

    const route = useRouter();

    useEffect(() => {
        async function takeBranch() {
            const response = await axios.get(`http://localhost:3001/${route.query.repoName}/`);
            setBranches(response.data.data.filter(item => item.name !== route.query.branch));
        }
        takeBranch();
        takeDiff();
    }, [])

    const takeDiff = async (branch = '') => {
        const response = await axios.post(`http://localhost:3001/diff`, {
            origin: route.query.branch,
            destination: branch || selectedBranch,
            repository: route.query.repoName
        });
        setHasDiff(response.data.data);
    }

    const onHandlerCreatePullRequest = async () => {
        const fields: HTMLCollectionOf<Element> = document.getElementsByClassName('field');
        let hasEmpty = false;
        [].slice.call(fields).map(item => {
            if (!item.value) {
                hasEmpty = true;
            }
        })

        if (!hasEmpty) {
            const auxRev = [];
            reviewers.map(it => {
                auxRev.push({
                    User:
                    {
                        connect: {
                            id: it.id
                        }
                    },
                    status: 0
                })
            })
            const body = {
                origin: route.query.branch,
                destination: selectedBranch || branches[0].name,
                description,
                idRepository: route.query.repoId,
                title,
                id: route.query.id,
                reviewers: auxRev
            }
            const { data } = await axios.post(`http://localhost:3001/pullrequest/${route.query.repoName}/${route.query.id}`, body);
            if (!data.error) {
                route.push({
                    pathname: `/diff/${route.query.id}`,
                    query: {
                        title,
                        description,
                        origin: route.query.branch,
                        destination: selectedBranch || branches[0].name,
                        repos: route.query.repoName
                    }
                })
            } else {
                alert('Ocorreu um erro ao realizar o pull request tente novamente.')
            }

        }
    }

    const handlerSearchUsers = async ({ target: { value } }) => {
        setUserField(value);
        if (value) {
            const response = await axios.get('http://localhost:3001/users/' + value);
            if (response.data.data.length > 0)
                setUsers(response.data.data);
        } else {
            setUsers(null);
        }
    }

    const handlerAddReviewer = (item) => {
        const contains = reviewers.filter(it => it.id === item.id);
        if (contains.length === 0) {
            const aux: Array<UserModel> = [...reviewers];
            aux.push(item);
            setReviewers(aux);
            setUsers(null);
            setUserField('');
        }
    }

    const onHandlerRemoveReviewer = (item) => {
        setReviewers(reviewers.filter(it => it.id !== item.id));
    }

    return (
        <Container>
            <h1>Criar um pull request de {route.query.branch}</h1>
            <br />
            <Row>
                <p>Selecione a branch de destino: </p>
                <select onChange={({ target: { value } }) => {
                    setSelectedBranch(value);
                    takeDiff(value);
                }}>
                    {
                        branches && (
                            branches.map(item => {
                                return (
                                    <option key={item.name.replace('*', '')}
                                        value={item.name.replace('*', '')}>
                                        {item.name.replace('*', '')}</option>
                                )
                            }
                            ))
                    }
                </select>
            </Row>
            <br />
            <label>Reviewers adicionados</label>
            <ContainerReviewer>
                {
                    reviewers &&
                    reviewers.map(item => {
                        const arr = item.name.split(' ');
                        return (
                            <IconReviewer
                                color={getRandomColor()}
                                onClick={() => onHandlerRemoveReviewer(item)}>
                                {arr[0].charAt(0).toUpperCase()}
                                {arr[1]?.charAt(0).toUpperCase() || ''}
                            </IconReviewer>
                        )
                    })
                }
            </ContainerReviewer>
            <br />
            <label>Título do pull request</label>
            <input type="text" placeholder="Pull request title"
                maxLength={191}
                onChange={({ target: { value } }) => setTitle(value)} className="field" />
            <p>{title ? title.length + '  ' : '0  '}/ 191</p>
            <br />
            <label>Descrição</label>
            <textarea style={{ resize: 'none' }}
                onChange={({ target: { value } }) => setDescription(value)}
                className="field"
                maxLength={191}
                rows={5} placeholder="Describe your pull request..." />
            <p>{description ? description.length + '  ' : '0  '}/ 191</p>
            <br />
            <label>Adicionar reviewers</label>
            <input placeholder="Adicionar reviews" onChange={handlerSearchUsers} value={userField} />
            { users && (
                <Reviewers>
                    {
                        users.map(item => (
                            <p key={item.id} onClick={() => handlerAddReviewer(item)}>{item.name}</p>
                        ))
                    }
                </Reviewers>)
            }
            <br />
            <button className="link" onClick={onHandlerCreatePullRequest} disabled={!hasDiff}>Create pull request</button>
            <br />
            <br />
        </Container>
    )
};


export default PullRequest;