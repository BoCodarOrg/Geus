import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';


import Refractor from 'react-refractor';

import git from 'refractor/lang/git'
import { Container, Divider } from '../../src/styles/main';
import { ContainerReviewer } from '../../src/styles/pullrequest';
import { Status, Title, BoxConversation } from '../../src/styles/Diff'
import IconUsers from '../../src/components/IconUsers';
import Api from '../../src/server';

Refractor.registerLanguage(git)

const Diff: React.FC = () => {
    const [diff, setDiff] = useState<any>();
    const [conflicts, setConflicts] = useState<Array<number>>([]);

    const route = useRouter();
    const { title, description, origin, destination, id, repos, status, author, prId } = route.query;

    useEffect(() => {
        async function takeDiff() {
            const { data } = await Api.get(`/diff/${repos}/${id}`);
            if (!data.error) {
                const diffs: Array<string> = data.data.diff.filter(item => item !== '');

                const auxConfilcts: Array<number> = [];
                diffs.forEach((file, index) => {
                    if (file.indexOf('++<<<<<<< HEAD') !== -1) {
                        auxConfilcts.push(index);
                    }
                });
                data.data.diff = diffs;
                setConflicts(auxConfilcts);
                setDiff(data.data);
            } else {
                alert(data.data)
            }

        };
        if (parseInt(status[0]) === 0) {
            takeDiff();
        }
    }, []);

    const onHandlerMerge = async () => {
        try {
            const response = await Api.post(`/${repos}/merge`, {
                origin,
                destination,
                status: 1,
                id: prId
            })
            alert(response.data.data);
        } catch (e) {
            console.error(e);
        }
    }

    const checkTextStatus = () => {
        const stts = parseInt(status[0]);
        if (stts === 0) {
            return "Aberto"
        } else if (stts === 1) {
            return "Merged"
        } else {
            return "Rejeitado"
        }
    }

    return (
        <Container>
            <Title>
                <p>{title} <p className="gray">#{prId}</p></p>
                <p className="tiny">{origin} para {destination}</p>
            </Title>

            <Status status={parseInt(status[0])}>
                {
                    //1 - Merged, 2 - Rejected, 3 - Conflict, 0 - Opened
                    checkTextStatus()
                }
            </Status>
            <Divider />
            <label>Reviewers</label>
            <ContainerReviewer>
                {
                    diff && diff.reviewers.map(item => <IconUsers name={item.User.name} />)
                }
            </ContainerReviewer>
            <Divider />
            <BoxConversation>
                <div>
                    {author}
                </div>
                <div>
                    {description}
                </div>
            </BoxConversation>
            <br />
            {
                diff && diff.diff.map((item, index) => {
                    if (conflicts.length > 0) {
                        if (conflicts.indexOf(index) !== -1) {
                            return (
                                <div>
                                    <h5>Arquivo com conflito</h5>
                                    <Refractor language="git" value={item} />
                                </div>
                            )
                        }
                    }
                    return (<Refractor language="git" value={item} />)
                }) || "no changes"}

            <button className="success" disabled={!diff || conflicts.length > 0 || parseInt(status[0]) !== 0} onClick={onHandlerMerge}>Merge</button>
            <br />
            <br />
        </Container >
    )
}

export default Diff;