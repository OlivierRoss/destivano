Rails.application.routes.draw do

  root 'accueil#index', :as => 'root'

  get 'entreprise/mission' => 'entreprise#mission'
  get 'entreprise/histoire' => 'entreprise#histoire'
  get 'entreprise/media' => 'entreprise#media'
  get 'entreprise/equipe' => 'entreprise#equipe'

  get 'intranet/dashboard' => 'intranet#dashboard'

end
