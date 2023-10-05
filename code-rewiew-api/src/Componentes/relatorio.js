import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const generatePDF = (commits) => {
    const doc = new jsPDF();

    const data = commits.map(obj => {
      const { codigo, ...rest } = obj;
      return Object.values(rest);
    });

    doc.autoTable({
      head: [['Nome', 'Descrição', 'Repositório', 'Data']],
      body: data,
      didDrawPage: function (data) {
        doc.setTextColor(40);
        doc.text('Commits Tecnouri', data.settings.margin.left, 10);
      },
    });

    doc.save('meu-arquivo-pdf.pdf');
  };