import styles from './Quote.module.css';

export default function Quote({ text }: { text: string }) {
    return (
        <blockquote className={styles.quoteContainer}>
            <p className={styles.quoteText}>&quot;{text}&quot;</p>
        </blockquote>
    );
}