export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Treino Personalizado</h3>
            <p className="text-gray-400">
              Transforme sua vida com treinos personalizados e acompanhamento profissional.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <p className="text-gray-400">
              Email: contato@treinopersonalizado.com<br />
              Telefone: (XX) XXXX-XXXX
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Redes Sociais</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">Instagram</a>
              <a href="#" className="text-gray-400 hover:text-white">Facebook</a>
              <a href="#" className="text-gray-400 hover:text-white">WhatsApp</a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Treino Personalizado. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}