import clsx from "clsx";
import {PropsWithChildren} from "react";

const Input = ({className, props}: {className?: string, props: PropsWithChildren}) => {
    return (
        <input
            className={clsx(
                "border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full",
                className
            )}
            required
            {...props}
        />
    );
};

export default Input;