const { createApp } = Vue;

createApp({
  data() {
    return {
      age: null,
      ageGroup: null,
      isFamilyOrFriend: null,
      relationship: '',
      isTrustedPerson: null,
      hasSmartphone: null,
      safeContacts: [],
      humiliation: null,
      afraid: null,
      rape: null,
      kick: null,
      counselingDuration: null,
      counselingFrequency: null,
      willingToFollowUp: null,
      isEligible: false
    };
  },
  methods: {
    submitForm() {
      const formData = {
        age: this.age,
        ageGroup: this.ageGroup,
        isFamilyOrFriend: this.isFamilyOrFriend,
        relationship: this.relationship,
        isTrustedPerson: this.isTrustedPerson,
        hasSmartphone: this.hasSmartphone,
        safeContacts: this.safeContacts,
        humiliation: this.humiliation,
        afraid: this.afraid,
        rape: this.rape,
        kick: this.kick,
        counselingDuration: this.counselingDuration,
        counselingFrequency: this.counselingFrequency,
        willingToFollowUp: this.willingToFollowUp
      };

      // ตรวจสอบคุณสมบัติ
      if (
        this.ageGroup === '18-60' &&
        this.isFamilyOrFriend === 'yes' &&
        this.isTrustedPerson === 'yes' &&
        this.hasSmartphone === 'yes' &&
        this.safeContacts.length > 0 
      ) {
        this.isEligible = true;
      } else {
        this.isEligible = false;
      }

      // ส่งข้อมูลไปยัง Google Sheets
      this.sendToGoogleSheets(formData);
    },
    async sendToGoogleSheets(formData) {
      try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbzgBX_j79S7DeYSrlvsPMKsqYSwHtpCjnq4vg2W1VFVx8EJ9T4aJOgdPFMuorAy-cNJ/exec', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        const result = await response.json();
        console.log('Data sent successfully:', result);
      } catch (error) {
        console.error('Error sending data:', error);
      }
    }
  }
}).mount('#app');
