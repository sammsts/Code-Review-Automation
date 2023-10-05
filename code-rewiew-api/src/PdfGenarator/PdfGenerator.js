
import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import Relatorio from '../pages/Home/relatorio';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const PdfGenerator = () => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Este é um PDF gerado com React-PDF</Text>
          <Relatorio />
        </View>
      </Page>
    </Document>
  );
};

export default PdfGenerator;
