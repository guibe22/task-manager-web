export default function Participa({ Participa }) {
  const color = Participa ? 'green' : 'red';

    return (
        <span className={`inline-flex items-center bg-${color}-100 text-${color}-800 text-md font-medium px-2.5 py-0.5 rounded-full dark:bg-${color}-900 dark:text-${color}-300`}>
            {Participa ? 'PARTICIPA' : 'NO PARTICIPA'}
        </span>
    );
}