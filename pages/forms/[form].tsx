import type { InferGetStaticPropsType } from "next";
import Head from "next/head";
import ErrorPage from "next/error";
import { useRouter } from "next/router";

import { findIndex } from "lodash";
import { useEffect, useState } from "react";

import { NavBar } from "../../components/navbar";
import { readConfig } from "../../utils/data";
import useScreenSize, { screenSizes } from "../../services/screen-size/use";
import { EmbeddedForm } from "../../interfaces/form";
import Footer, { getFooterProps } from "../../components/footer";

const parseFormData = async (forms: {[key: string]: EmbeddedForm}) => {
  const parse = (await import("hypertag")).default;
  return Object.keys(forms).map((form) => {
    const data = forms[form];
    const tags = parse(data.embedTag || "", "script");
    if (!tags.length) {
      throw Error(
        `embedTag in the form '${form}' could not be parsed. Please ensure the tag ` +
        `is copied exactly from the form creation website. (got: '${data.embedTag}')`
      )
    }
    const tag = tags[0]
    if (data.type !== "cognito") {
      throw Error(
        `Unrecognized form type '${data.type}' in the form '${form}'. Currently only ` +
        `'cognito' is supported`
      );
    }
    ["src", "data-key", "data-form"].forEach(attr => {
      if (!(attr in tag)) {
        throw Error(
          `embedTag in the form '${form}' is missing the required attribute '${attr}'` +
          ` (has '${Object.keys(tag)}')`
        )
      }
    })

    return {
      src: tag.src,
      key: tag["data-key"],
      dataForm: tag["data-form"],
      id: form,
      ...forms[form],
    };
  });
}


export const getStaticProps = async () => {
  const config = await readConfig()
  const forms = await parseFormData(config.forms || {})

  return {
    props: {
      config,
      forms,
    },
  };
};

export const getStaticPaths = async () => {
  const config = await readConfig()
  return {
    paths: (Object.keys(config.forms || {}) || []).filter(name => {
      return !(config.forms?.[name].hidden)
    }).map((name) => {
      return { params: { form: name } };
    }),
    fallback: false,
  };
};

const GenericForm = ({
  config,
  forms,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  const { form: formId } = router.query as { form: string };
  const {
    state: { screenSize },
  } = useScreenSize();
  const [ formContent, setFormContent ] = useState(<div className="spacer"></div>)

  useEffect(() => {
    const script = document.createElement("script");
    script.src = formData.src;
    script.async = true;
    script.setAttribute("data-key", formData.key);
    script.setAttribute("data-form", formData.dataForm);
    const el = document.getElementById("registration-form")
    if (el) {
      el.innerHTML = ''
      el.appendChild(script);
    }
  });

  const formIndex = findIndex(forms, (form) => formId === form.id)
  if (formIndex < 0) {
    return <ErrorPage statusCode={404}/>
  }
  const formData = forms[formIndex];

  if (!formData) {
    return <ErrorPage statusCode={404} />;
  }

  const smallScreen = screenSize < screenSizes["md"];

  return (
    <div className="app">
      <Head>
        <title>{formData.shortTitle} - Brainhack Western 2022</title>
        <meta
          name="description"
          content="Frequently asked Questions for Brainhack Western"
        />
      </Head>
      <div className="splash">
        <NavBar
          displaySections={config.displaySections}
          splashMode={!smallScreen}
        />
        {/* <Image src={Logo}></Image> */}
        {smallScreen ? null : <div className="spacer"></div>}
        <div className="container-sm back-card">
          <h1>{formData.title}</h1>
          <div className="container console overlap-up" id="registration-form">
            <div className="spacer"></div>
          </div>
        </div>
      </div>
      <Footer {...getFooterProps(config)}/>
    </div>
  );
};

export default GenericForm;