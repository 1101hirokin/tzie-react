import { useState } from 'react';
import { App, Button } from './components';

const Demo = () => {
    const [count, setCount] = useState(0);

    return (
        <App>
            <div>Count: {count}</div>

            <Button
                onClick={() => {
                    setCount(count + 1);
                }}
                variant="filled"
                elevation={0}
                shape="rounded"
                color="plain"
                disabled={false}
            >
                <Button.Leading>+</Button.Leading>
                Count Up
                <Button.Trailing>hello</Button.Trailing>
            </Button>
            <Button
                onClick={() => {
                    setCount(count + 1);
                }}
                variant="text"
                elevation={0}
                shape="rounded"
                color="danger"
                loading
            >
                Help
            </Button>
        </App>
    );
};

export default Demo;
