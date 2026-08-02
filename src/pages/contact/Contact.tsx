import EmailSignupForm from "@components/email-signup-form/EmailSignupForm";
import styles from "./Contact.module.css";

function Contact() {
  return (
    <div className={styles.contactPage}>
      <section className={styles.content}>
        <h2 className={styles.header}>CONTACT</h2>
        <EmailSignupForm className={styles.emailSignupForm} />

        <div className={styles.booking}>
          <h3 className={styles.bookingHeader}>BOOKING</h3>
          <div>
            <address className={styles.address}>
              <div className={styles.region}>USA</div>
              <div className={styles.booker}>BlackStrap Booking</div>
              <a href="mailto:ivy@blackstrapbooking.com">
                ivy@blackstrapbooking.com
              </a>
            </address>
            <address className={styles.address}>
              <div className={styles.region}>EUROPE</div>
              <div className={styles.booker}>Swamp Booking</div>
              <div>
                <a href="mailto:nikita@swampbooking.com">
                  nikita@swampbooking.com
                </a>
              </div>
              <div>
                <a href="mailto:ricky@swampbooking.com">
                  ricky@swampbooking.com
                </a>
              </div>
            </address>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
