export default function Buttons({children, textOnly, className, ...props}) {
    let cssClasses = textOnly ? 'text-button': 'button';
    cssClasses += ' ' + className;
    return (
        <button  className={cssClasses} {...props}>
            {children}
        </button>
    )
}