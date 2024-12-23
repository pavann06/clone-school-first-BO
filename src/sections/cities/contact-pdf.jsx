import { useMemo } from 'react';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import { Page, View, Text, Font, Image, Document, StyleSheet } from '@react-pdf/renderer';

// ----------------------------------------------------------------------

Font.register({
  family: 'Roboto',
  fonts: [{ src: '/fonts/Roboto-Regular.ttf' }, { src: '/fonts/Roboto-Bold.ttf' }],
});

Font.register({
  family: 'Nunito',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/nunito/v12/XRXV3I6Li01BKofINeaE.ttf' },
    { src: 'https://fonts.gstatic.com/s/nunito/v12/XRXW3I6Li01BKofA6sKUYevN.ttf' },
  ],
});

const useStyles = () =>
  useMemo(
    () =>
      StyleSheet.create({
        col4: { width: '25%' },
        col8: { width: '75%' },
        col6: { width: '50%' },
        mb4: { marginBottom: 4 },
        mb8: { marginBottom: 8 },
        mb40: { marginBottom: 40 },
        h3: { fontSize: 16, fontWeight: 700 },
        h4: { fontSize: 12, fontWeight: 700 },
        body1: { fontSize: 10 },
        body2: { fontSize: 9 },
        subtitle1: { fontSize: 10, fontWeight: 700 },
        subtitle2: { fontSize: 9, fontWeight: 700 },
        alignRight: { textAlign: 'right' },
        page: {
          fontSize: 9,
          lineHeight: 1.6,
          fontFamily: 'Roboto',
          backgroundColor: '#FFFFFF',
          textTransform: 'capitalize',
          padding: '40px 24px 120px 24px',
        },
        footer: {
          left: 0,
          right: 0,
          bottom: 0,
          padding: 24,
          margin: 'auto',
          borderTopWidth: 1,
          borderStyle: 'solid',
          position: 'absolute',
          borderColor: '#DFE3E8',
        },
        gridContainer: {
          flexDirection: 'row',
          justifyContent: 'space-between',
        },
        table: {
          display: 'flex',
          width: 'auto',
          borderRight: 1,
          borderStyle: 'solid',
          borderColor: '#DFE3E8',
        },
        tableRow: {
          padding: '8px 8px',
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderStyle: 'solid',
          borderColor: '#DFE3E8',
        },
        headerBg: {
          backgroundColor: '#666',
          borderStyle: 'solid',
          borderColor: '#DFE3E8',
          borderWidth: 1,
        },
        noBorder: {
          paddingTop: 8,
          paddingBottom: 0,
          borderBottomWidth: 0,
        },
        tableCell_1: {
          width: '10%',
          fontFamily: 'Nunito',
        },
        tableCell_2: {
          width: '25%',
          fontFamily: 'Nunito',
        },
        tableCell_3: {
          width: '45%',
          fontFamily: 'Nunito',
        },
        tableCell_4: {
          width: '20%',
          fontFamily: 'Nunito',
        },
      }),
    []
  );

// ----------------------------------------------------------------------

export default function ContactPDF({ subledger, finYearStart, finYearEnd, Contact, Client }) {
  const styles = useStyles();

  let totalDebit = 0;
  let totalCredit = 0;

  function getVoucherNumber(item) {
    if (item.entity === 'SALES') {
      return `SO-${item.id}`;
    }
    if (item.entity === 'SALES RETURNS') {
      return `SR-${item.id}`;
    }
    if (item.entity === 'PURCHASES') {
      return `PO-${item.id}`;
    }
    if (item.entity === 'PAYMENTS') {
      return `PY-${item.id}`;
    }
    return '';
  }

  subledger.forEach((item) => {
    if (item.type === 'CREDIT') {
      totalCredit += parseFloat(item.final_amount);
    } else {
      totalDebit += parseFloat(item.final_amount);
    }
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={{ borderWidth: 1, borderStyle: 'solid' }}>
          <View style={[styles.gridContainer]}>
            <Image
              source={Client?.client?.logo}
              style={{ width: 50, height: 50, paddingRight: 4 }}
            />

            <View style={styles.col6}>
              <Text style={styles.subtitle1}>{Client?.client.client_name}</Text>
              <Text>{Client?.client.city}</Text>
              <Text>State-{Client?.client.state}</Text>
              <Text>Licence No-{Client?.client.license_number}</Text>
              <Text>GSTIN-{Client?.client.gst_number}</Text>
              <Text>Phone-{Client?.client.mobile}</Text>
            </View>

            <View style={{ borderLeftWidth: 1, borderLeftStyle: 'solid', marginRight: 10 }} />

            <View style={[styles.col6]}>
              <Text style={styles.subtitle1}>Consignee</Text>
              <Text>{Contact?.full_name}</Text>
              <Text>{Contact?.address1}</Text>
              <Text>{Contact?.state}</Text>
              <Text>{Contact?.mobile}</Text>
              <Text>GSTIN-{Contact?.gst_number}</Text>
            </View>
          </View>
        </View>

        <View style={{ marginBottom: 10 }} />

        <Text style={[styles.subtitle1, styles.mb8, { alignSelf: 'center' }]}>
          {Contact?.full_name} Sub Ledger {finYearStart} TO {finYearEnd}
        </Text>

        <View style={{ borderWidth: 1, borderStyle: 'solid', marginTop: 15 }}>
          <View style={styles.table}>
            <View>
              <View style={[styles.tableRow, styles.headerBg]}>
                <View style={styles.tableCell_1}>
                  <Text style={styles.subtitle2}>SNo</Text>
                </View>

                <View style={styles.tableCell_2}>
                  <Text style={styles.subtitle2}>Date</Text>
                </View>

                <View style={styles.tableCell_3}>
                  <Text style={styles.subtitle2}>Voucher No</Text>
                </View>

                <View style={styles.tableCell_3}>
                  <Text style={styles.subtitle2}>Account</Text>
                </View>

                <View style={styles.tableCell_4}>
                  <Text style={styles.subtitle2}>Debit </Text>
                </View>

                <View style={styles.tableCell_4}>
                  <Text style={styles.subtitle2}>Credit</Text>
                </View>

                <View style={styles.tableCell_4}>
                  <Text style={styles.subtitle2}>Balance</Text>
                </View>
              </View>
            </View>
            <View>
              {subledger.map((item, index) => (
                <View style={styles.tableRow} key={index}>
                  <View style={styles.tableCell_1}>
                    <Text>{index + 1}</Text>
                  </View>

                  <View style={styles.tableCell_2}>
                    <Text style={styles.subtitle2}>
                      {item.date ? format(new Date(item.date), 'dd-MM-yyyy') : ''}
                    </Text>
                  </View>

                  <View style={styles.tableCell_3}>
                    <Text>{getVoucherNumber(item)}</Text>
                  </View>

                  <View style={styles.tableCell_3}>
                    <Text>{`${item.entity}-A/C`}</Text>
                  </View>

                  {item.type === 'CREDIT' ? (
                    <>
                      <View style={styles.tableCell_4}>
                        <Text>0</Text>
                      </View>
                      <View style={styles.tableCell_4}>
                        <Text>{item.final_amount}</Text>
                      </View>
                      <View style={styles.tableCell_4}>
                        <Text>{item?.balance}</Text>
                      </View>
                    </>
                  ) : (
                    <>
                      <View style={styles.tableCell_4}>
                        <Text>{item.final_amount}</Text>
                      </View>
                      <View style={styles.tableCell_4}>
                        <Text>0</Text>
                      </View>
                      <View style={styles.tableCell_4}>
                        <Text>{item?.balance}</Text>
                      </View>
                    </>
                  )}
                </View>
              ))}
              {/* extra row */}
              <View style={styles.tableRow} key={849}>
                <View style={styles.tableCell_1}>
                  <Text> </Text>
                </View>

                <View style={styles.tableCell_2}>
                  <Text style={styles.subtitle2}> </Text>
                </View>

                <View style={styles.tableCell_3}>
                  <Text> </Text>
                </View>

                <View style={styles.tableCell_3}>
                  <Text style={styles.h4}>Total </Text>
                </View>

                <View style={styles.tableCell_4}>
                  <Text style={styles.h4}>{totalDebit}</Text>
                </View>
                <View style={styles.tableCell_4}>
                  <Text style={styles.h4}>{totalCredit}</Text>
                </View>
                <View style={styles.tableCell_4}>
                  <Text style={styles.h4}>{subledger[subledger.length - 1]?.balance}</Text>
                </View>
              </View>
              {/* extra row end */}
            </View>
          </View>
        </View>

        <View style={[styles.gridContainer, styles.footer]} fixed>
          <View style={styles.col8}>
            <Text style={styles.subtitle2}>NOTES</Text>
            <Text>We appreciate your business.</Text>
          </View>
          <View style={[styles.col4, styles.alignRight]}>
            <Text style={styles.subtitle2}>Have a Question?</Text>
            <Text>{Client.client.email}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}

ContactPDF.propTypes = {
  subledger: PropTypes.array,
  finYearStart: PropTypes.string,
  finYearEnd: PropTypes.string,
  Contact: PropTypes.object,
  Client: PropTypes.object,
};
