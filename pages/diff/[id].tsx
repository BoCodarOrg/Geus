import React, { useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';


import 'bootstrap/dist/css/bootstrap.min.css';

import { useRouter } from 'next/router';
import axios from 'axios';


import Refractor from 'react-refractor';

import git from 'refractor/lang/git'

Refractor.registerLanguage(git)

const Diff: React.FC = () => {
    const [diff, setDiff] = useState<Array<string>>();
    const [conflicts, setConflicts] = useState<Array<number>>([]);

    const route = useRouter();
    const { title, description, origin, destination, id, repos } = route.query;

    useEffect(() => {
        async function takeDiff() {
            const body = { origin, destination }
            const { data: { data } } = await axios.post(`http://localhost:3001/diff/${repos}/${id}`, body);
            const diffs: Array<string> = data.filter(item => item !== '');

            const auxConfilcts: Array<number> = [];
            diffs.forEach((file, index) => {
                if (file.indexOf('++<<<<<<< HEAD')) {
                    auxConfilcts.push(index);
                }
            })
            setConflicts(auxConfilcts);
            setDiff(diffs);
        };

        takeDiff();
    }, []);

    const onHandlerMerge = async () => {
        try {
            const response = await axios.post(`http://localhost:3001/${repos}/merge`, { origin: `${origin}`.replace('*', '').trim(), destination: `${destination}`.replace('*', '').trim() })
            alert(response.data.data);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <Container>
            <br />
            <h1>
                {title}
            </h1>
            <p>
                Diff {origin} from {destination}
            </p>
            <cite>
                {description}
            </cite>
            <br />
            <p>
                Conflicts number {conflicts.length}
            </p>
            <br />
            <br />
            {
                diff && diff.map((item, index) => {
                    if (conflicts.length > 0) {
                        console.log(conflicts.indexOf(index))
                        if (conflicts.indexOf(index) !== -1) {
                            return (
                                <div>
                                    <h5>Conflict file</h5>
                                    <Refractor language="git" value={item} />
                                </div>
                            )
                        }
                    }
                    return (<Refractor language="git" value={item} />)
                }) || "no changes"}

            <Button variant="success" disabled={!diff || conflicts.length > 0} onClick={onHandlerMerge}>Merge</Button>
        </Container >
    )
}

export default Diff;