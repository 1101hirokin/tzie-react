import { useState } from 'react';
import { App, Button } from './components';
import './../dist/css/tokens.css';

const Demo = () => {
    const [count, setCount] = useState(0);

    return (
        <App>
            <div>Count: {count}</div>

            <Button
                onClick={() => {
                    setCount(count + 1);
                }}
                variant="text"
                elevation={0}
                shape="rounded"
                color="hiroki"
            >
                <Button.Leading>+</Button.Leading>
                Count Up
                <Button.Trailing>hello</Button.Trailing>
            </Button>
        </App>
    );
};

export default Demo;
