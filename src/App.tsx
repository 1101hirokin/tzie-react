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
                block
                elevation={23}
            >
                Count Up
            </Button>
        </App>
    );
};

export default Demo;
