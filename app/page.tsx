const semester = [
  "Drafting my senior research paper on a phonology question",
  "Transcribing and glossing recorded speech in a field methods course",
  "Reading on how Pidgin (Hawaiʻi Creole) is used and perceived in Hawaiʻi",
];

export default function Home() {
  return (
    <div className="page">
      <header className="hero">
        <h1>Nataniel Balantac</h1>
        <p className="lede">a senior at UH Manoa studying linguistics</p>
        <div className="ornament" aria-hidden="true" />
      </header>

      <main>
        <section aria-labelledby="about-heading">
          <h2 id="about-heading">About</h2>
          <p className="dropcap">
            My degree is in linguistics at UH Manoa, where I am a senior. This
            is my last year, so most of my time goes to upper-level coursework
            and the research that comes with it.
          </p>
        </section>

        <section aria-labelledby="semester-heading">
          <h2 id="semester-heading">This semester</h2>
          <ul className="list">
            {semester.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="footer">
        <div className="ornament" aria-hidden="true" />
        <p>© Nataniel Balantac {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
