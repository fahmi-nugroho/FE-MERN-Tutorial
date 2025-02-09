import Head from "next/head";

interface PropsTypes {
    title?: string;
}

const PageHead = (props: PropsTypes) => {
    const {title = 'Acara'} = props;
    return (
        <Head>
            <title>{title}</title>
            <meta charSet="UTF-8"/>
            <meta
                name="viewport"
                content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
        </Head>
    )
}

export default PageHead;
