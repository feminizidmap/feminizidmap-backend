'use strict';

/**
 * cases-export service
 */

module.exports = {
  // For now this is empty, but we'll add CSV transformation logic here later
  async exportToCsv(data) {
    // Create header row from the first item
    if (!data || data.length === 0) {
      return '';
    }

    // Process the complex data structure into a flattened format suitable for CSV
    const processedData = data.map(caseItem => {
      const processed = {
        // Basic case fields
        // id: caseItem.id,
        // uuid: caseItem.uuid,
        identifier: caseItem.identifier,
        registration_date: caseItem.registration_date,
        crime_date: caseItem.crime_date,
        // createdAt: caseItem.createdAt,
        // updatedAt: caseItem.updatedAt,
        publishedAt: caseItem.publishedAt,
        notes: caseItem.notes,
        // review: caseItem.review,
        // review2: caseItem.review2,
        attempt: caseItem.attempt,
        authority: caseItem.authority,
        media_labels_details: caseItem.media_labels_details,
        report_of_crime_details: caseItem.report_of_crime_details,
      };

      // Process address if exists
      if (caseItem.address) {
        processed.address_id = caseItem.address.id;
        processed.address_street = caseItem.address.street;
        processed.address_city = caseItem.address.city;
        processed.address_county = caseItem.address.county;
        processed.address_country = caseItem.address.country;
        processed.address_postal_code = caseItem.address.postal_code;
      }

      // Process crime if exists
      if (caseItem.crime) {
        // processed.crime_id = caseItem.crime.id;
        processed.crime_location_details = caseItem.crime.location_details;
        processed.crime_weapon_details = caseItem.crime.weapon_details;
        processed.crime_motive_details = caseItem.crime.motive_details;
        processed.crime_description_of_crimescene = caseItem.crime.description_of_crimescene;
        processed.crime_acts_of_violence_details = caseItem.crime.acts_of_violence_details;
        processed.crime_crime_address_details = caseItem.crime.crime_address_details;
      }

      // Process the first perpetrator if exists
      if (caseItem.perpetrator && caseItem.perpetrator.length > 0) {
        const perpetrator = caseItem.perpetrator[0];
        // processed.perpetrator_id = perpetrator.id;
        processed.perpetrator_lastname = perpetrator.lastname;
        processed.perpetrator_firstname = perpetrator.firstname;
        processed.perpetrator_age = perpetrator.age;
        processed.perpetrator_is_suspect = perpetrator.is_suspect;
        processed.perpetrator_profession_details = perpetrator.profession_details;
        processed.perpetrator_drugs_details = perpetrator.drugs_details;
        processed.perpetrator_mental_illness_details = perpetrator.mental_illness_details;
        processed.perpetrator_sentence_details = perpetrator.sentence_details;
        processed.perpetrator_criminal_record_details = perpetrator.criminal_record_details;
        processed.perpetrator_restraining_order_details = perpetrator.restraining_order_details;
        processed.perpetrator_citizenship_details = perpetrator.citizenship_details;
        processed.perpetrator_family_status_other = perpetrator.family_status_other;
        processed.perpetrator_gender_details = perpetrator.gender_details;
        processed.perpetrator_suicide_details = perpetrator.suicide_details;
        processed.perpetrator_judical_status_details = perpetrator.judical_status_details;
        processed.perpetrator_perpetrator_address_details = perpetrator.perpetrator_address_details;
        processed.perpetrator_citizenship_country = perpetrator.citizenship_country;
      }

      // Process the first victim if exists
      if (caseItem.victim && caseItem.victim.length > 0) {
        const victim = caseItem.victim[0];
        // processed.victim_id = victim.id;
        processed.victim_firstname = victim.firstname;
        processed.victim_lastname = victim.lastname;
        processed.victim_age = victim.age;
        processed.victim_profession_details = victim.profession_details;
        processed.victim_workplace = victim.workplace;
        processed.victim_drugs_details = victim.drugs_details;
        processed.victim_reports_on_violence_details = victim.reports_on_violence_details;
        processed.victim_survived_by_details = victim.survived_by_details;
        processed.victim_citizenship_details = victim.citizenship_details;
        processed.victim_family_status_other = victim.family_status_other;
        processed.victim_type_of_feminicide_details = victim.type_of_feminicide_details;
        processed.victim_victim_address_details = victim.victim_address_details;
        processed.victim_citizenship_country = victim.citizenship_country;
      }

      // Process the first source if exists
      if (caseItem.source && caseItem.source.length > 0) {
        const source = caseItem.source[0];
        // processed.source_id = source.id;
        processed.source_url = source.url;
        processed.source_source_type_details = source.source_type_details;
        processed.source_pdf_created = source.pdf_created;
      }

      // Process media_labels if exists
      if (caseItem.media_labels && caseItem.media_labels.length > 0) {
        const mediaLabel = caseItem.media_labels[0];
        // processed.media_labels_id = mediaLabel.id;
        processed.media_labels_label = mediaLabel.label;
        // processed.media_labels_createdAt = mediaLabel.createdAt;
        // processed.media_labels_updatedAt = mediaLabel.updatedAt;
      }

      // Process report_of_crime
      processed.report_of_crime = caseItem.report_of_crime ? caseItem.report_of_crime.id : null;

      // Process comments - join them with a space
      if (caseItem.comments && caseItem.comments.length > 0) {
        // processed.comments_id = caseItem.comments[0].id;
        processed.comments_comment = caseItem.comments.map(c => c.comment).join(' | ');
      }

      // Process authorities_involved
      processed.authorities_involved = caseItem.authorities_involved && caseItem.authorities_involved.length > 0 
        ? caseItem.authorities_involved.map(a => a.comment).join(' | ') 
        : '';

      // Process media_labels_used
      processed.media_labels_used = caseItem.media_labels_used && caseItem.media_labels_used.length > 0 
        ? caseItem.media_labels_used.map(m => m.comment).join(' | ') 
        : '';

      return processed;
    });

    // Get all headers from all items
    const headers = Array.from(
      new Set(
        processedData.flatMap(item => Object.keys(item))
      )
    ).sort();

    // Create TSV rows with proper escaping
    const escapeField = (field) => {
      if (field === null || field === undefined) return '';
      const str = String(field);
      // If the field contains a tab or newline, wrap it in quotes
      if (str.includes('\t') || str.includes('\n') || str.includes('"')) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    };

    const rows = [
      headers.join('\t'),
      ...processedData.map(item => 
        headers.map(header => escapeField(item[header])).join('\t')
      )
    ];

    return rows.join('\n');
  }
}; 