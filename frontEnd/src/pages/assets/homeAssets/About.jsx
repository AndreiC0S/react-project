import React from 'react';
import PaginaProduse from './PaginaProduse';

function DespreNoi() {
  return (
    <section className="bg-gray-100 py-12 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Despre Noi</h2>
        <p className="text-gray-600 mb-8">
          Suntem o echipă dedicată pasionată de tehnologie și inovație, cu misiunea de a aduce soluții digitale care să îmbunătățească viața de zi cu zi. Încă de la începuturile noastre, am pus un accent deosebit pe calitate, inovație și deschiderea către nevoile clienților noștri.
        </p>
        <div>
            <PaginaProduse/>
        </div>
      </div>
    </section>
  );
}

export default DespreNoi;
