import EMAIL from '@constants/email.constants';

const SectionSeventh = () => (
    <section>
        <div className="title">7. Зміна політики конфіденційності</div>
        <div className="content">
            Користувач приймає умови цієї політики конфіденційності та враховує, що дана політика
            конфіденційності може час від часу змінюватися без попереднього повідомлення користувача,
            у тому числі при зміні вимог законодавства. Зміни, що вносяться до політики конфіденційності,
            публікуються на цій сторінці. Просимо час від часу переглядати Політику для того, щоб бути
            в курсі будь—яких змін або доповнень.
            <br />
            З питань щодо політики конфіденційності (в т.ч. видалення персональних даних), Користувач може
            зв&apos;язатися з нами, використовуючи e—mail:
            <a className="link" href={`https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}`}>{EMAIL}</a>
            .
        </div>
    </section>
);

export default SectionSeventh;
