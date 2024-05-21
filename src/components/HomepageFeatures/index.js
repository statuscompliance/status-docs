import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";
import NodeRedImg from "@site/static/img/nodeRED.png";
import Grafana from "@site/static/img/grafana.png";
import Bluejay from "@site/static/img/bluejay.png";

const FeatureList = [
  {
    title: "Node-RED",
    Img: NodeRedImg,
    description: (
      <>
        Our system integrates the Node-RED tool to collect information from
        different data to be analysed.
      </>
    ),
  },
  {
    title: "BlueJay",
    Img: Bluejay,
    description: (
      <>
        Using bluejay, we process the analysed information and compliance
        statistics are generated.
      </>
    ),
  },
  {
    title: "Grafana",
    Img: Grafana,
    description: (
      <>
        Once the catalogue of business process compliance controls has been
        created, we use Grafana to generate useful charts for agile compliance
        management.
      </>
    ),
  },
];

function Feature({ Img, Svg, title, description }) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        {Img ? (
          <img src={Img} className={styles.featureImg} alt={title} />
        ) : (
          <Svg className={styles.featureSvg} role="img" />
        )}
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
