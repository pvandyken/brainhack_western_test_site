import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import style from '../styles/globals.css'

import type { InferGetStaticPropsType } from 'next';
import Head from 'next/head';

import Footer, { getFooterProps } from '../components/footer';
import { NavBar } from '../components/navbar';
import { RegisterButton } from '../components/register-button';
import { inferRegistrationStatus, readConfig } from '../utils/data';
import { Helmet } from 'react-helmet';

export const getStaticProps = async () => {
  const config = await inferRegistrationStatus(await readConfig());
  return {
    props: {
      config
    }
  };
};

const FaqPage = ({
  config
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div className={style.home.app}>
      <Helmet>
        <title>{`FAQ - Brainhack Western ${config.event.year}`}</title>
        <meta
          name="description"
          content="Frequently asked Questions for Brainhack Western"
        />
      </Helmet>
      <NavBar
        displaySections={config.displaySections}
        registrationButton={
          config.registration.status === 'open' ? (
            <RegisterButton settings={config.registration} />
          ) : null
        }
      />
      <article className={`container-lg ${style.content.content}`}>
        <h1>FAQ</h1>
        {config.faq?.map((faq) => {
          return (
            <section key={faq.question}>
              <h3>{faq.question}</h3>
              <ReactMarkdown className="console" remarkPlugins={[remarkGfm]}>
                {faq.answer}
              </ReactMarkdown>
            </section>
          );
        })}
      </article>
      <Footer {...getFooterProps(config)} />
    </div>
  );
};

export default FaqPage;
