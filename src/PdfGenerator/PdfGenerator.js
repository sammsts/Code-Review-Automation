import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Link } from '@react-pdf/renderer';
import logo from './public/logo_tecnouri.png';
import logo_github from './public/github.png';

//RELATÓRIO SIMPLES
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
    padding: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  logo: {
    width: 55,
    height: 50,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderColor: '#b2b2b2',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: { margin: 'auto', flexDirection: 'row' },
  tableColHeader: {
    width: '20%',
    borderStyle: 'solid',
    borderColor: '#b2b2b2',
    borderBottomWidth: 1,
    borderRightWidth: 1,
    backgroundColor: '#f2f2f2',
    padding: 5,
    overflow: 'hidden',
  },
  tableCol: {
    width: '20%',
    borderStyle: 'solid',
    borderColor: '#b2b2b2',
    borderBottomWidth: 1,
    borderRightWidth: 1,
    padding: 5,
    overflow: 'hidden',
  },
  link: {
    color: 'blue',
    textDecoration: 'underline',
  },
  codeText: {
    fontSize: 10,
  },
  logo_github: {
    width: 20,
    height: 20,
  },
  totalizadorSection: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
});

const PdfGenerator = ({ commits }) => {
  const totalizador = commits.length;

  return (
    <Document>
      <Page size="A4" style={styles.page} orientation="landscape">
        <View style={styles.header}>
          <Text style={styles.headerText}>Relatório de Commits - simples</Text>
          <Image style={styles.logo} src={logo} />
        </View>
        <View style={styles.section}>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableColHeader}>
                <Text>Código</Text>
              </View>
              <View style={[styles.tableColHeader, { alignItems: 'center' }]}>
                <Text>Autor</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text>Mensagem</Text>
              </View>
              <View style={[styles.tableColHeader, { alignItems: 'center' }]}>
                <Text>Repositório</Text>
              </View>
              <View style={[styles.tableColHeader, { alignItems: 'center' }]}>
                <Text>Data</Text>
              </View>
            </View>
            {commits.map(commit => (
              <View style={styles.tableRow} key={commit.codigo}>
                <View style={[styles.tableCol, styles.codeText]}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Link style={styles.link} src={commit.url} target="_blank">
                      <Image style={styles.logo_github} src={logo_github} />
                    </Link>
                    <Text style={{ marginLeft: 5 }}>{'Ver no GitHub'}</Text>
                  </View>
                </View>
                <View style={[styles.tableCol, styles.codeText, { alignItems: 'center' }]}>
                  <Text>{commit.autor}</Text>
                </View>
                <View style={[styles.tableCol, styles.codeText]}>
                  <Text>{commit.mensagem}</Text>
                </View>
                <View style={[styles.tableCol, styles.codeText, { alignItems: 'center' }]}>
                  <Text>{commit.repositorio}</Text>
                </View>
                <View style={[styles.tableCol, styles.codeText, { alignItems: 'center' }]}>
                  <Text>{commit.data}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.totalizadorSection}>
          <Text>Total: {totalizador}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default PdfGenerator;


//RELATÓRIO DETALHADO
// const styles = StyleSheet.create({
//   page: {
//     flexDirection: 'row',
//     backgroundColor: '#FFFFFF',
//     padding: 10,
//   },
//   section: {
//     margin: 10,
//     padding: 10,
//     flexGrow: 1,
//   },
//   title: {
//     fontSize: 20,
//     marginBottom: 10,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   subTitle: {
//     fontSize: 15,
//     marginBottom: 10,
//     fontWeight: 'bold',
//   },
//   text: {
//     fontSize: 12,
//     marginBottom: 5,
//   },
//   separator: {
//     borderBottom: '1px solid #000000',
//     marginBottom: 5,
//   },
//   codeLink: {
//     color: 'blue',
//     textDecoration: 'underline',
//     cursor: 'pointer',
//   },
// });

// const PdfGenerator = ({ commits }) => {
//   return (
//     <Document>
//       <Page size="A4" style={styles.page}>
//         <View style={styles.section}>
//           <View style={styles.titleContainer}>
//             <Image src={logo} style={{ width: 60, height: 60 }} />
//             <Text style={styles.title}>Relatório de Commits</Text>
//           </View>

//           {commits.map((commit) => (
//             <View key={commit.codigo} style={styles.section}>
//               <Text style={styles.subTitle}>
//                 Código:{' '}
//                 <Link style={styles.codeLink} src={commit.url}>
//                   {commit.codigo}
//                 </Link>
//               </Text>
//               <Text style={styles.text}>Autor: {commit.autor}</Text>
//               <Text style={styles.text}>Mensagem: {commit.mensagem}</Text>
//               <Text style={styles.text}>Repositório: {commit.repositorio}</Text>
//               <Text style={styles.text}>Data: {commit.data}</Text>
//               <View style={styles.separator} />
//             </View>
//           ))}
//         </View>
//       </Page>
//     </Document>
//   );
// };

// export default PdfGenerator;