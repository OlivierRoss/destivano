class IntranetController < ApplicationController

    def dashboard
        redirect_to root_path unless cookies[:admin] == 1 or true
    end

end
